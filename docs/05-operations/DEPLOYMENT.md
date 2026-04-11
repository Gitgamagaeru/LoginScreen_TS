---
title: DEPLOYMENT.md
version: 1.2.0
status: approved
owner: "@tech-lead"
created: 2026-01-01
updated: 2024-03-15
reviewers:
  - "@senior-dev"
  - "@security-team"
---
# DEPLOYMENT.md 
## 環境
 | 環境 | URL | 用途 | 
 |------|-----|------| 
 | development | localhost:3000 | ローカル開発 | 
 | staging | なし | なし | 
 | production | Vercelの公開URL | 本番環境 | 

## デプロイフロー 
1. `NEXTAUTH_SECRET`, `DATABASE_URL` などを環境変数に設定する。
2. GitHubとVercelを連携し、mainブランチへのマージをトリガーに自動デプロイさせる。
3. デプロイ時にPrismaのマイグレーションが走るよう、ビルドコマンドを設定する。

## 監視項目 
なし

## 障害対応 
### Runbook 
なし
