import type { NextAuthConfig } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

/**
 * ミドルウェア（Edge Runtime）で動作する軽量な NextAuth 設定
 * ※ Prisma や bcrypt などの Node.js API 依存ライブラリは含めないこと
 */
export const authConfig = {
    // 認証ページのルーティング設定
    pages: {
        signIn: '/login', // サインインが必要な場合のカスタムページパス
    },
    // OAuth系プロバイダーの設定（シークレットの受け渡しのみで完結するためEdge等でも動作可）
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ⚠️ 注意：Credentials（メールパスワード）はここでは定義しません。
        // なぜなら、Credentials は DB 接続やパスワード照合が必要になり、
        // ミドルウェア（Edge Runtime）では動作しなくなるからです。
    ],
    // リクエスト時の評価やデータ操作を行うコールバック
    callbacks: {
        // ミドルウェアから呼ばれる、ルート保護のための認可ロジック
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            
            if (isOnDashboard) {
                // ダッシュボードへのアクセス：ログインしていれば許可、未ログインなら拒否（signInページへ）
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                // ログイン済みのユーザーがダッシュボード以外（トップやログイン画面）に来た場合はダッシュボードへ強制送還
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            // その他のルートは常にアクセス許可
            return true;
        },
    },
} satisfies NextAuthConfig;
