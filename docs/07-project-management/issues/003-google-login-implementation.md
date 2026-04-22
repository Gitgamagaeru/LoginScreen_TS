---
title: '[Task] Googleログイン（OAuth）の実装'
id: '#6'
status: done
created: 2026-04-14
updated: 2026-04-23
labels:
  - auth
  - frontend
---

## 🎯 目的・背景

OAuthを用いた利便性の高いログイン手段として、Googleログインを提供するため。(ADR-005 準拠)

## ✅ やること（Todo）

- [x] Google Cloud Console での OAuth クライアント ID 生成
- [x] NextAuth の `GoogleProvider` 設定の追加
- [x] ログイン画面への「Googleでログイン」ボタンの実装

## 🏆 完了条件（Acceptance Criteria）

- [x] Googleアカウントを用いて正常にサインイン・アカウント作成ができること
- [x] ログイン成功後に適切なページへリダイレクトされること

## 🔗 関連ドキュメント・Issue

- [ADR-005: 認証プロバイダーの選定](../../06-reference/adr/ADR-005_social_login_provider.md)
