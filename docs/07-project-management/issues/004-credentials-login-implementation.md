---
title: '[Task] メール・パスワード認証（Credentials）の実装'
id: '#7'
status: todo
created: 2026-04-14
updated: 2026-04-17
labels:
  - auth
  - frontend
  - backend
---

## 🎯 目的・背景

独自のメールアドレスとパスワードによる認証機能を提供し、OAuthを利用しないユーザーも登録・ログインできるようにするため。(ADR-001 準拠)

## ✅ やること（Todo）

- [ ] サインアップ・ログイン用フォームUIの作成
- [ ] Zod等を用いたバリデーション（8文字以上・半角英数字混在）の実装
- [ ] `bcryptjs` を用いたパスワードのハッシュ化
- [ ] Prismaを通じたユーザー情報のDB保存

## 🏆 完了条件（Acceptance Criteria）

- [ ] 指定のパスワードポリシーを満たす形式で新規登録・ログインができること
- [ ] DBにパスワードがハッシュ化された状態で保存されていること

## 🔗 関連ドキュメント・Issue

- [ADR-001: パスワードポリシー](../../06-reference/adr/ADR-001_password_policy.md)
- [DOMAIN.md](../../01-context/DOMAIN.md)
