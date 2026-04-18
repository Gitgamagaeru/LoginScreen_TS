---
title: '[Task] Googleログイン（OAuth）の実装'
id: '#6'
status: todo
created: 2026-04-14
updated: 2026-04-17
labels:
  - auth
  - frontend
---

## 🎯 目的・背景

OAuthを用いた利便性の高いログイン手段として、Googleログインを提供するため。(ADR-005 準拠)

## ✅ やること（Todo）

- [ ] Google Cloud Console での OAuth クライアント ID 生成
- [ ] NextAuth の `GoogleProvider` 設定の追加
- [ ] ログイン画面への「Googleでログイン」ボタンの実装

## 🏆 完了条件（Acceptance Criteria）

- [ ] Googleアカウントを用いて正常にサインイン・アカウント作成ができること
- [ ] ログイン成功後に適切なページへリダイレクトされること

## 🔗 関連ドキュメント・Issue

- [ADR-005: 認証プロバイダーの選定](../../06-reference/adr/ADR-005_social_login_provider.md)
