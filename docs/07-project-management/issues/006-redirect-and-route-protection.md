---
title: '[Task] リダイレクト先とルート保護'
id: '#9'
status: todo
created: 2026-04-14
updated: 2026-04-17
labels:
  - auth
  - midddleware
---

## 🎯 目的・背景

認証成功後にユーザーを正しい画面へ誘導し、未認証ユーザーが保護されたページ（ダッシュボード等）にアクセスできないようにするため。(ADR-004 準拠)

## ✅ やること（Todo）

- [ ] ログイン・サインアップ成功時のリダイレクト先を `/dashboard` に設定
- [ ] `middleware.ts` による未認証ユーザーの保護ページアクセス遮断
- [ ] セッション状態に応じた動的なリダイレクト設定

## 🏆 完了条件（Acceptance Criteria）

- [ ] ログイン後に `/dashboard` に遷移すること
- [ ] ログアウト状態で `/dashboard` にアクセスした際、ログイン画面にリダイレクトされること

## 🔗 関連ドキュメント・Issue

- [ADR-004: リダイレクト先](../../06-reference/adr/ADR-004_redirect_after_login.md)
