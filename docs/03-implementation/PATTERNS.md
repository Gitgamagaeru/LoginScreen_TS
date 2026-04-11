---
title: PATTERNS.md
version: 1.2.0
status: approved
owner: "@tech-lead"
created: 2026-01-01
updated: 2026-04-11
reviewers:
  - "@senior-dev"
  - "@security-team"
---
# PATTERNS.md 

## コーディング規約
### 命名規則 
- 変数：camelCase 
- 定数：UPPER_SNAKE_CASE 
- クラス：PascalCase 
- ファイル：kebab-case.ts 

### エラーハンドリング 
```typescript 
// ログインエラー等の認証処理ではNextAuthのAuthErrorを利用
import { AuthError } from "next-auth"
// 適切にtry-catchまたはコンポーネント側にエラーを渡す
``` 

## 頻出パターン 
### セッション取得パターン（サーバー）
```typescript
import { auth } from "@/auth"
// Server Components内で `const session = await auth()` を用いて認証状態をチェックする。
```

### Server Actions分離パターン
```typescript
// src/lib/actions.ts ("use server"を宣言)
export async function loginWithXYZ() { /* 認証処理 */ }

// page.tsx などのUI
import { loginWithXYZ } from "@/lib/actions"
<form action={loginWithXYZ}>
```
UIファイル内に非同期のロジック（`action={async () => ...}`）を直接書かず、別ファイルに明示的に分離して単一責任にする。

### リポジトリパターン 
なし（Prismaクライアントを直接利用する）

### サービスパターン 
なし

## アンチパターン 
### 避けるべき実装 
- any型の使用（代わりにunknownを使用） 
- マジックナンバー（代わりに定数化） 
- 複数責務の関数（単一責任に分割）
- クライアントから送信されたパスワードをハッシュ化せずにDB保存する。
