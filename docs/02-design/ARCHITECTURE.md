---
title: ARCHITECTURE.md
version: 1.2.0
status: approved
owner: "@tech-lead"
created: 2026-01-01
updated: 2026-04-13
reviewers:
  - "@senior-dev"
  - "@security-team"
---
# ARCHITECTURE.md

## システム構成図
なし（VercelにてNext.jsをホスティングし、PostgreSQLへ接続する構成）

## 技術スタック
| レイヤー | 技術 | バージョン | 選定理由 | ADR |
|---------|------|-----------|---------|-----|
| Frontend | Next.js | 最新 | App Router対応、フロント・バックエンド統合 | なし |
| State | なし | - | 認証状態はNextAuthで管理するため不要 | - |
| Backend | NextAuth.js | 最新 | 認証・セッション管理、OAuth連携が容易 | なし |
| Security| bcryptjs | 最新 | Credentials利用時のパスワードハッシュ化・検証 | なし |
| Driver | pg, @prisma/adapter-pg | 最新 | Prisma 7におけるPostgreSQLへの接続ドライバー・アダプター | なし |
| Database | PostgreSQL | 最新 | ユーザー、セッション情報の保存 | なし |
| ORM | Prisma | 最新 | 型安全なデータベース操作、スキーマ管理 | なし |
| Email | Resend, react-email | 最新 | Next.jsとの親和性が高く、トークン送付等のメール実装が容易 | [ADR-003](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-003_email_provider.md) |
| Cache | なし | - | セッションはDBまたはJWTで管理 | - |

## コンポーネント設計
### APIレイヤー
- ルーティング：Next.js App Router形式に従う。
- 認証：`src/auth.ts` で一元管理し、`app/api/auth/[...nextauth]/route.ts` にてAPIルートを構築する。
- 処理呼び出し：`src/lib/actions.ts` にServer Actionsを集約し、UIから呼び出す。
- エラーハンドリング：NextAuthの標準エラーに準拠。

### サービスレイヤー
- 依存性注入：なし
- トランザクション：Prismaを通じて実行。

### データアクセスレイヤー
- ORM：Prisma
- マイグレーション：Prisma CLI（`prisma migrate dev` または `db push`）を利用。

## 設計判断記録（ADR）
- [ADR-001: パスワードポリシーとロックアウト要件の策定](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-001_password_policy.md)
- [ADR-002: 同一メールアドレスでのソーシャル・パスワード重複登録時の挙動](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-002_duplicate_email_registration.md)
- [ADR-003: メール送信プロバイダーの選定](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-003_email_provider.md)
- [ADR-004: ログイン・登録成功後のリダイレクト先](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-004_redirect_after_login.md)
- [ADR-005: MVPで実装するソーシャルログインプロバイダーの対象](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-005_social_login_provider.md)
