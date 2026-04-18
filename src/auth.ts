import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

/**
 * NextAuth のメイン設定ファイル（Node.js 環境用・バックエンド本体）
 * authConfig (軽量設定) を継承し、DBアダプターや パスワード照合などの思い処理を統合します。
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  // 軽量な Edge 設定（ページパスやOAuth、認可ロジック）をすべて引き継ぐ
  ...authConfig,
  
  // ユーザーやセッション情報をDB(PostgreSQL)と同期するためのPrisma連携
  adapter: PrismaAdapter(prisma),
  
  // セッションの管理方式（CredentialsProviderを利用する場合は 'jwt' 必須）
  session: { strategy: 'jwt' },
  
  // すべての認証プロバイダー（OAuth + DB認証）の統合
  providers: [
    ...authConfig.providers, // auth.config.ts で定義した GitHub/Google を引き継ぐ
    
    // DB照合とパスワード検証を伴うメール/パスワード認証の設定
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // ユーザーが入力した情報を元にログイン可否を判定する処理
      async authorize(credentials) {
        // バリデーション: 入力値が欠けていればエラー
        if (!credentials?.email || !credentials?.password) return null;

        // DB検索: メールアドレスからユーザーを取得
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // 存在チェック: ユーザーが存在しない、またはソーシャル専用アカウント（パスワード未設定）なら弾く
        if (!user || !user.password) return null;

        // パスワード検証: bcrypt でハッシュ化されたパスワードと入力値を照合
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isPasswordValid) return null;

        // 検証成功: セッションを発行する対象としてユーザー情報を返す
        return user;
      },
    }),
  ],
});
