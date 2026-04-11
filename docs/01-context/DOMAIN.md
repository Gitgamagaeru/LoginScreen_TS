---
title: DOMAIN.md
version: 1.2.0
status: approved
owner: "@tech-lead"
created: 2026-01-01
updated: 2024-03-15
reviewers:
  - "@senior-dev"
  - "@security-team"
---
# DOMAIN.md

## ドメインモデル
### User
- id: UUID
- email: string（一意）
- password: string（ハッシュ化、認証用）
- image: string（OAuthプロバイダーから取得）

### Account
- id: UUID
- userId: UUID（Userとの紐付け）
- provider: string（Google, GitHubなど）
- providerAccountId: string

### Session
- sessionToken: string（一意）
- userId: UUID
- expires: DateTime

### VerificationToken
- identifier: string（メールアドレス等）
- token: string（一意）
- expires: DateTime

## ビジネスルール
### 登録・認証ルール
- 同一メールアドレスでの重複登録はシステム共通で1ユーザーとする。
- OAuthプロバイダー経由のログインは該当のプロバイダー認証を正とする。

### パスワード生成ルール
- パスワードは必ずハッシュ化して保存し、平文で扱わない。

## 状態遷移
### セッション状態遷移
```text
未ログイン (unauthenticated) → 認証・ログイン処理 → ログイン済み (authenticated)
↓                                         ↓
(ログイン失敗)                            ログアウト

```

## 用語集
| 用語 | 定義 |
|------|------|
| Session（セッション） | ユーザーがログイン状態であることを保持する情報 |
| OAuthプロバイダー | GoogleやGitHubなど、認証を代行してくれる外部サービス |
| Magic Link | パスワードを入力せず、メールに送られたURLを踏むだけでログインできる仕組み |
