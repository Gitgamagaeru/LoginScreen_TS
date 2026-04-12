---
title: DOMAIN.md
version: 1.2.0
status: approved
owner: "@tech-lead"
created: 2026-01-01
updated: 2026-04-13
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
- type: string
- provider: string（Google, GitHubなど）
- providerAccountId: string
- access_token: string（OAuth用）
- refresh_token: string（OAuth用）
- expires_at: int（有効期限）

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
- 同一メールアドレスでの重複登録試行（Google経由とパスワード経由の混在など）は、セキュリティのためブロックし「既に〇〇で登録されています」とエラーを表示する。 (詳細は [ADR-002](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-002_duplicate_email_registration.md) 参照)
- MVPフェーズで許可するソーシャルログインプロバイダーはGoogleのみとする。 (詳細は [ADR-005](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-005_social_login_provider.md) 参照)
- 確認メールなどのトークン有効期限は24時間とする。(詳細は [ADR-003](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-003_email_provider.md) 参照)

### パスワードルール
- 文字数：8文字以上
- 制約：半角英数字の混在
- 保存：必ずハッシュ化して保存し、平文で扱わない
- ロックアウト：連続失敗時のロックアウトはインフラ（WAF/レート制限）に委ねる。 (詳細は [ADR-001](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-001_password_policy.md) 参照)

## 状態遷移
### セッション状態遷移
```text
未ログイン (unauthenticated) → 認証・ログイン処理 → (成功) → /dashboard へリダイレクト → ログイン済み (authenticated)
↓                                         ↓
(ログイン失敗)                            ログアウト

```
※ログイン成功後は一律で `/dashboard` に遷移させる (詳細は [ADR-004](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-004_redirect_after_login.md) 参照)

## 用語集
| 用語 | 定義 |
|------|------|
| Session（セッション） | ユーザーがログイン状態であることを保持する情報 |
| OAuthプロバイダー | GoogleやGitHubなど、認証を代行してくれる外部サービス |
| Magic Link | パスワードを入力せず、メールに送られたURLを踏むだけでログインできる仕組み |
