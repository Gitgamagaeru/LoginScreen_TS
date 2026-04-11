---
title: ARCHITECTURE.md
version: 1.2.0
status: approved
owner: "@tech-lead"
created: 2026-01-01
updated: 2026-04-11
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
| Database | PostgreSQL | 最新 | ユーザー、セッション情報の保存 | なし |
| ORM | Prisma | 最新 | 型安全なデータベース操作、スキーマ管理 | なし |
| Cache | なし | - | セッションはDBまたはJWTで管理 | - |

## コンポーネント設計
### APIレイヤー
- ルーティング：Next.js App Router形式に従う。
- 認証：NextAuth.js（`app/api/auth/[...nextauth]/route.ts`）にて制御。
- エラーハンドリング：NextAuthの標準エラーに準拠。

### サービスレイヤー
- 依存性注入：なし
- トランザクション：Prismaを通じて実行。

### データアクセスレイヤー
- ORM：Prisma
- マイグレーション：Prisma CLI（`prisma migrate dev` または `db push`）を利用。

## 設計判断記録（ADR）
なし
