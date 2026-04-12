---
title: glossary.md
version: 1.0.0
status: draft
owner: "@tech-lead"
created: 2026-04-13
updated: 2026-04-13
---
# 用語集 (Glossary)

本プロジェクトで使用される主要な用語とその定義をまとめます。
（DOMIAN.md 内等に記載されていた用語を統合・拡充しています）

## アプリケーション・ドメイン

| 用語 | 英語表記 | 定義 |
|------|----------|------|
| Session（セッション） | Session | ユーザーがログイン状態であることを保持する情報。NextAuthにより一意の `sessionToken` と有効期限 (`expires`) が管理される。 |
| OAuthプロバイダー | OAuth Provider | GoogleやGitHubなど、認証を代行してくれる外部サービス。本プロジェクトのMVPフェーズではGoogleのみを許可。 |
| Magic Link | Magic Link | パスワードを入力せず、メールに送られたURLを踏むだけで認証・ログインできる仕組み。 |
| UUID | UUID | Universally Unique Identifier。データベース上のUserやAccountの一意な識別番号として使用。 |
| ハッシュ化 | Hashing | パスワードなどの秘匿情報を、元の値に戻せないランダムな固定長の文字列に変換する処理。 |

## 技術・フレームワーク

| 用語 | 英語表記 | 定義 |
|------|----------|------|
| Next.js | Next.js | フロントエンドUIとバックエンドAPIの両方を構築可能なReactフレームワーク。本番での最適なパフォーマンスを提供する。 |
| NextAuth.js | NextAuth.js | Next.jsアプリ向けの汎用的かつセキュアな認証ソリューション。OAuth, メール, 資格情報等に対応。 |
| Prisma | Prisma | Node.jsおよびTypeScript向けの次世代ORM。型安全にDB（PostgreSQL）を操作できる。 |
| PostgreSQL | PostgreSQL | 本プロジェクトのデータを保存しているリレーショナルデータベース管理システム。 |
| Resend | Resend | 開発者向けのモダンなメール配信プラットフォーム。APIを利用してプログラムから簡単にメール（確認メールやMagic Linkなど）を送信するために使用。 |

## セキュリティ・運用

| 用語 | 英語表記 | 定義 |
|------|----------|------|
| JWT | JSON Web Token | ヘッダー、ペイロード、署名からなるセキュアなトークン。セッション情報などの軽量な受け渡しに用いる。 |
| WAF | Web Application Firewall | Webアプリケーションの脆弱性を突いた攻撃から保護するシステム。 |
| レート制限 | Rate Limiting | 短期間に過剰なリクエスト（ログインの連続失敗など）が送信されるのを防ぐためのインフラストラクチャー層の制限。 |
| ADR | Architecture Decision Record | アーキテクチャ上の重要な決定事項とその背景、結果を記録するドキュメント（`docs/06-reference/adr/` に保存）。 |
