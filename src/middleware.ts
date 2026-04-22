import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

/**
 * Next.jsのミドルウェア（門番）設定
 * 
 * なぜこれが検問所として機能するのか：
 * 1. 【規約】Next.jsが「middleware.ts」という名前のファイルを自動的に検知して実行する仕組みだからです。
 * 2. 【代表】export defaultされた関数を、Next.jsが「アクセス制限の判定役」として使用します。
 * 3. 【適合】.auth関数はNext.jsが門番に期待するインターフェースにピッタリ合うように設計されています。
 */
export default NextAuth(authConfig).auth;

export const config = {
  /**
   * 検問を実施する場所（matcher）の指定
   * 
   * (?!api|_next/static|_next/image|favicon.ico) の意味：
   * API、静的ファイル、画像、アイコン「以外」のすべてのページアクセス時に
   * このミドルウェア（検問所）を起動させます。
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};