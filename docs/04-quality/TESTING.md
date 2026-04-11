---
title: TESTING.md
version: 1.2.0
status: approved
owner: "@tech-lead"
created: 2026-01-01
updated: 2024-03-15
reviewers:
  - "@senior-dev"
  - "@security-team"
---
# TESTING.md

## テストピラミッド
- Unit: なし（ログイン機能メインのため、一旦保留）
- Integration: なし
- E2E: なし（クリティカルパスであるログインフローは手動テストとし、E2EはPhase 2とする）
*※現在はすべて手動テスト（受け入れテスト）にて対応する*

## テストの書き方
### 手動テストの観点（追加事項）
- 正しいメール・パスワードでログインできること。
- OAuth連携（Google等）から正常にログインできること。
- 間違った情報では適切に弾かれること。
- ログアウト後に保護されたページにアクセスできないこと。

### ユニットテスト
なし

### モックの方針
なし

## カバレッジ目標
なし
