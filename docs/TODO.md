---
title: TODO.md
version: 1.0.0
status: draft
owner: "@tech-lead"
created: 2026-04-11
updated: 2026-04-13
---
# プロジェクト TODO リスト

## 設定・インフラ関連
- [ ] pre-commitフックの設定をする（Markdownの `updated` 自動更新の仕組み等を構築）

## ドキュメント・整備
- [x] PRを起点とした運用工程の策定・ドキュメント化 (`PR_WORKFLOW.md`)
- [ ] 各種 `docs/*.md` の詳細な要件やビジネスルールをプロジェクトに合わせて埋める

## 開発・実装タスク
- [ ] コミットメッセージからの `CHANGELOG.md` 自動生成の仕組み（Conventional Commits等）を導入
- [ ] **NextAuth.js基盤のセットアップ** [Issue #002](./07-project-management/issues/002-nextauth-setup.md)
  - NextAuth (v5 / Auth.js) の初期化と `auth.config.ts`、 `app/api/auth/[...nextauth]/route.ts` などの構築
- [ ] **Googleログイン（OAuth）の実装** (ADR-005) [Issue #003](./07-project-management/issues/003-google-login-implementation.md)
  - `GoogleProvider` の設定
  - UIに「Googleでログイン」ボタンを実装
- [ ] **メール・パスワード認証（Credentials）の実装** (ADR-001) [Issue #004](./07-project-management/issues/004-credentials-login-implementation.md)
  - サインアップ・ログイン用フォームUI의作成
  - 8文字以上・半角英数字混在のバリデーション実装
  - `bcryptjs` を用いたパスワードハッシュ化処理とDB保存
- [ ] **エラーハンドリングと重複登録制限** (ADR-002) [Issue #005](./07-project-management/issues/005-error-handling-duplicate-email.md)
  - Google/Credentials両方での同一メールアドレス登録をフロント・バックエンドでエラー検知
  - 「既に〇〇で登録されています」というカスタムエラーメッセージのUI表示
- [ ] **リダイレクト先とルート保護** (ADR-004) [Issue #006](./07-project-management/issues/006-redirect-and-route-protection.md)
  - ログイン・登録成功時のリダイレクト先を `/dashboard` に設定
  - `middleware.ts` を用いた未ログインユーザーの `/dashboard` へのアクセス制御
- [ ] **確認メール・トークン送信基盤の構築** (ADR-003) [Issue #007](./07-project-management/issues/007-email-token-infrastructure.md)
  - `Resend` と `react-email` を用いたメール送信パッケージの設定
  - 24時間有効トークンの発行と検証ロジックの実装（次フェーズのリセット機能の布石として）
- [ ] **UIの統合テスト（手動）** [Issue #008](./07-project-management/issues/008-manual-ui-integration-test.md)
  - 全ての認証フローのエッジケース（エラー処理、リダイレクト等）が `TESTING.md` に沿って満たせるか確認

## 未決定仕様・確認待ち（TBD）

- [x] **1. 【セキュリティ・認証】パスワードポリシーとロックアウト要件の合意**
  - **曖昧・未決定な点**: パスワードの複雑さ要件（何文字以上、記号必須かなど）と、ブルートフォース攻撃（総当たり攻撃）に対するアカウントロックの仕様が決まっていません。
  - **影響・リスク**: 脆弱なパスワード（「password123」など）による不正アクセスや、悪意あるユーザーによる連続ログイン試行を防げないセキュリティリスクがあります。
  - **提案オプション / 確認事項**:
    - [x] 案A: パスワードは「8文字以上、半角英数字混在」。連続失敗時のロックアウトは実装せず、NextAuthの標準機能とVercel/CloudflareのWAF（レート制限）に任せる。（MVPとして推奨）
    - [ ] 案B: パスワードは「12文字以上、記号必須」。5回連続ログイン失敗でアカウントを30分間ロックする。（よりセキュアだが実装工数増）
    - ✅ 決定: **案A** (詳細は [ADR-001](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-001_password_policy.md) 参照)

- [x] **2. 【エラーハンドリング】同一メールアドレスでのソーシャル・パスワード重複登録時の挙動決定**
  - **曖昧・未決定な点**: Googleログインした後に同じメールアドレスでパスワード登録しようとした場合（またはその逆）のシステム挙動が決まっていません。
  - **影響・リスク**: NextAuthのデフォルト挙動では `OAuthAccountNotLinked` エラーとなり、不親切なエラー画面が表示されてUXが著しく低下します。
  - **提案オプション / 確認事項**:
    - [x] 案A: 重複を検知した場合、「既に〇〇で登録されています」という分かりやすいエラーメッセージを表示してブロックする。
    - [ ] 案B: アカウントの自動リンク（既存アカウントへの統合）を許可する。
    - ✅ 決定: **案A** (詳細は [ADR-002](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-002_duplicate_email_registration.md) 参照)

- [x] **3. 【インフラ・外部依存】メール送信プロバイダーの選定**
  - **曖昧・未決定な点**: 確認メール等を送信するためのサービス（プロバイダー）と、トークンの有効期限が指定されていません。
  - **影響・リスク**: 処理基盤がないため、Phase2のパスワードリセットなども含めてメール実装が進められません。
  - **提案オプション / 確認事項**:
    - [x] 案A: Next.jsとの親和性が高い **Resend** を使用し、トークンの有効期限は「24時間」とする。
    - [ ] 案B: SendGrid や Amazon SES を使用する。
    - ✅ 決定: **案A (Resend)** (詳細は [ADR-003](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-003_email_provider.md) 参照)

- [x] **4. 【UI/UXと状態遷移】ログイン・登録成功後のリダイレクト先**
  - **曖昧・未決定な点**: ログインまたは新規登録が成功した後に、ユーザーをどの画面（URL）に遷移させるかが定義されていません。
  - **影響・リスク**: 認証は成功しても、ユーザーがどこを見ていいか分からず迷子になります。
  - **提案オプション / 確認事項**:
    - [x] 案A: ログイン後は保護されたトップページ（例: `/dashboard`）に遷移させる。
    - [ ] 案B: ログイン後はアプリケーションのランディングページ（ `/` ）に戻す。
    - ✅ 決定: **案A** (詳細は [ADR-004](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-004_redirect_after_login.md) 参照)

- [x] **5. 【機能の境界】MVPで実装するソーシャルログインプロバイダーの対象決定**
  - **曖昧・未決定な点**: 実装するソーシャルプロバイダーの具体的な対象が確定していません。（DOMAIN.mdにはGoogle, GitHubの例示あり）
  - **影響・リスク**: 開発のスコープが広がり、不要なプロバイダーのAPIキー取得などの設定工数が発生する可能性があります。
  - **提案オプション / 確認事項**:
    - [x] 案A: MVPでは利用者の多い **Googleログイン** のみを実装する。
    - [ ] 案B: GoogleログインとGitHubログインの **両方** を実装する。
    - ✅ 決定: **案A** (詳細は [ADR-005](file:///c:/Users/nomur/Documents/100_AiDev/01_Login/docs/06-reference/adr/ADR-005_social_login_provider.md) 参照)
