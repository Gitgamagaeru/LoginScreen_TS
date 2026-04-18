# Antigravity（AI開発アシスタント） カスタムスキル一覧

このドキュメントは、本プロジェクト内でこれまでに作成・登録した「AIエージェントのカスタムスキル」のバックアップリストです。
これらのスキルはローカルの `~/.gemini/antigravity/skills/` 配下に登録されており、特定のトリガーワードでAIに定型的な作業を自動実行させることができます。

## 📋 目次（スキル一覧）

- **[1. Issue Creation Skill](#1-issue-creation-skill-issue作成スキル)** : 機能の概要から詳細なGitHub Issueを自動作成するスキル
- **[2. validate-docs](#2-validate-docs-ドキュメント検証スキル)** : プロジェクトのコア文書群の整合性や完全性を自動検証するスキル
- **[3. sync-code-to-docs](#3-sync-code-to-docs-コードからドキュメントを逆同期するスキル)** : 実装コードの変更を設計ドキュメントに逆同期するスキル
- **[4. PR Review (Main Branch)](#4-pr-review-main-branch--prレビュー修正スキル)** : PRのレビューコメントを分析して自動で修正を適用するスキル
- **[5. extract-unclear-specs](#5-extract-unclear-specs-未決定仕様tbd抽出スキル)** : 要件やドキュメントから未決定事項や曖昧な仕様を洗い出すスキル
- **[6. create-adr](#6-create-adr-adr自動生成スキル)** : チャットで決定した仕様や技術選定の経緯からADRを自動生成するスキル
- **[7. evaluate-impact](#7-evaluate-impact-影響度評価adr自動生成スキル)** : PR_WORKFLOW.md に基づいて実装の影響度を評価し、HIGHの場合はADRを作成するスキル

---

## 1. Issue Creation Skill (Issue作成スキル)

**トリガー**: 「Issueを作って」「タスクをIssue化して」

```markdown
---
name: Issue Creation Skill
description: Skill for creating detailed GitHub Issues from vague feature requests by consulting project documentation.
---

# Issue Creation Skill / Issue作成スキル

## Trigger / トリガー

「Issueを作って」「タスクをIssue化して」

## Execution Steps / 実行手順

1. **ユーザーから機能の概要をヒアリング**
   ユーザーから作りたい機能の大まかな概要をヒアリングします。
2. **関連する仕様文書を参照**
   プロジェクト内の `DOMAIN.md` や `ARCHITECTURE.md` 等の既存ドキュメントを参照し、前提知識やシステム構成を把握します。
3. **受け入れ基準を具体化**
   「どのような状態になればこのタスクは完了となるか（Acceptance Criteria）」を具体的に言語化します。
4. **技術的制約を洗い出し**
   実装にあたっての技術的なハードルや、守るべきルール（PATTERNS.mdなどから）を洗い出します。
5. **スコープ外を明確化**
   「今回はやらないこと（対象外）」を明確にし、プルリクエストが肥大化するのを防ぎます。
6. **Issue形式で出力**
   リポジトリの `.github/ISSUE_TEMPLATE`（task.mdなど）のフォーマットに合わせて出力します。
```

---

## 2. validate-docs (ドキュメント検証スキル)

**トリガー**: 「ドキュメントを検証して」「validate-docs」

```markdown
---
name: validate-docs
description: Skill for verifying the consistency, completeness, and conventions of the core project documents.
---

# validate-docs / ドキュメント検証スキル

## 説明

プロジェクトの土台となるコア文書（7文書）の整合性と完全性を自動で検証・監査するスキルです。

## 実行手順

1. **全文書のFrontmatterを検証**
   `docs/` フォルダ内のすべてのMarkdwonファイルを読み込み、YAML Frontmatterの必須項目が漏れていないか確認します。
2. **内部リンクの有効性を確認**
   各文書に記載されているファイルパスやアンカーリンクが正しく機能しているか確認します。
3. **用語の統一性をチェック**
   `DOMAIN.md` に定義されている用語がブレずに使用されているかをチェックします。
4. **文書間の参照整合性を確認**
   `PROJECT.md` の要件に対して `ARCHITECTURE.md` の設計が追いついているか等を確認します。
5. **マスター索引と更新日 (updated) の整合性チェック**🔥
   各文書のFrontmatterの `updated` と、`MASTER.md` の文書索引表にある「更新日」が完全に一致しているかを厳密にチェックします。
6. **問題点をレポート**
   発見したエラーや改善点をテスト結果風レポートとして報告します。
```

---

## 3. sync-code-to-docs (コードからドキュメントを逆同期するスキル)

**トリガー**: 「srcからdocsを更新して」「実装に合わせてドキュメントを修正して」「sync-code-to-docsを実行」

```markdown
---
name: sync-code-to-docs
description: Skill to synchronize and update documentation based on actual implementations in the src directory and configuration files.
---

# sync-code-to-docs / 実装からドキュメントを逆同期するスキル

## 説明

直接ソースコード（`src/` 配下や `prisma/` など）に加えた新しい変更点や実装上の発見を、上流の設計ドキュメントへと自動でフィードバック（逆同期）するスキルです。

## 実行手順

1. **主要ソースコード群の調査**
   指定があった画面や自動で `src/` の構造、`schema.prisma` などの定義を読み込みます。
2. **既存ドキュメントの確認**
   同期対象となるドキュメント（`DOMAIN.md`、`ARCHITECTURE.md`、`PATTERNS.md`等）の内容を確認します。
3. **乖離（差分）の分析**
   - **データモデル（DOMAIN.md）**: `schema.prisma` 等で追加された新しいテーブルや属性。
   - **システム設計（ARCHITECTURE.md）**: 新しく導入したライブラリやファイル配置ルールの変更。
   - **実装パターン（PATTERNS.md）**: 実コードで採用した新しい書き方（例：Server Actionsなど）。
4. **ドキュメントの更新実行**
   分析した差分を埋めるため、Markdown側に適切な形式で追記・修正を行います。
5. **更新完了の報告**
   「どのドキュメントに、何を追記したか」を整理して報告し、`updated` の日付も最新化します。
```

---

## 4. PR Review (Main Branch) / PRレビュー修正スキル

**トリガー**: 「（PRのURLか修正指示を貼り付ける）」等

```markdown
---
name: PR Review (Main Branch)
description: Skill for parsing, organizing, and implementing fixes based on GitHub Pull Request review comments for PRs merging into the main branch.
---

# PR Review Skill (Main Branch) / PRレビュー修正スキル

## Workflow / ワークフロー

1. **Information Gathering / 情報収集**
   PRのURLや番号を入力とし、GitHub CLIを通じてベースブランチやレビューコメントを取得します。
2. **Analysis and Categorization / 分析と分類**
   指摘をファイルごとにグループ化し、「Critical（重要）」「Stylistic（スタイル）」等に分類します。
3. **Implementation Process / 実装プロセス**
   1つの指摘事項ごとに変更を適用し、都度 `git commit` を実行して詳細なコミットメッセージを残します。
4. **Self-Verification / 自己検証**
   修正が元の指摘に合致しているか自己検証し、テストでデグレードを確認します。
5. **Reporting / 報告**
   実施した変更の概要と、対応しなかった指摘があればその理由をレポートします。
```

---

## 5. extract-unclear-specs (未決定仕様・TBD抽出スキル)

**トリガー**: 「明確になっていない仕様を洗い出して」「TBDを教えて」「extract-unclear-specs」

```markdown
---
name: extract-unclear-specs
description: 要求仕様やドキュメントを分析し、現在明確になっていない仕様、未決定事項（TBD）、暗黙の前提となっている曖昧な点を洗い出してリスト化するスキル。
---

# Extract Unclear Specs Skill / 未決定仕様・TBD抽出スキル

## 説明

プロジェクトの要件や提供されたドキュメント（要件定義、仕様書、Issue、会話ログなど）を読み解き、「今決めなければならないこと」「見落とされがちな考慮漏れ」「曖昧な仕様」を抽出してユーザーに提示します。

## 実行手順

1. **インプットの分析**:
   ユーザーが作成したドキュメントや既存資料（`MASTER.md`, `DOMAIN.md` 等）を参照し、コンテキストを把握します。
2. **未定義事項の洗い出し**:
   機能の境界、非機能要件、UI/UXエッジケース、データ仕様などの観点から欠落・曖昧な仕様を特定します。
3. **リストの作成と提案**:
   指摘だけでなく、決めるための「案A/案B」といった選択肢や推奨事項を生成します。
4. **TODOへの追記**:
   洗い出したリストを `docs/TODO.md` 内へと自動でタスクとして追記し、合意の漏れを防ぎます。
5. **ドキュメントの更新**:
   ユーザーが選択した方針に従い、ドキュメントを更新してTODOをクローズします。
```

---

## 6. create-adr (ADR自動生成スキル)

**トリガー**: 「ADRを作って」「〇〇に決定。経緯を残して」「create-adr」

```markdown
---
name: create-adr
description: ユーザーとのやり取りで決定した仕様や技術選定の経緯（ADR）を自動整理し、指定のフォーマットでファイルとして保存するスキル。
---

# Create ADR Skill / 意思決定記録作成スキル

## 説明

「何を決定したか」「なぜ決定したか」「代替案はなぜ却下されたか」をチャットの文脈から抽出し、`docs/06-reference/adr/ADR-00X.md` のテンプレートフォーマットに従う形でナンバリングされたADRファイルを自動作成します。

## 実行手順

1. **連番の特定**:
   `docs/06-reference/adr/` 内を走査し、次の連番を特定します（例：ADR-001）。
2. **情報抽出・構造化**:
   これまでの議論から「コンテキスト」「決定事項」「選定理由」「代替案と却下理由」「将来への影響」を自動で言語化します。
3. **ファイル保存**:
   `docs/06-reference/adr/ADR-XXX_タイトル.md` としてMarkdownファイルを作成し保存します。
4. **ドキュメントのリンク更新** (オプション):
   `ARCHITECTURE.md` 等へ、作成したADRへのリンク付与を行います。
```

---

## 7. evaluate-impact (影響度評価＆ADR自動生成スキル)

**トリガー**: 「影響度を調査して」「影響度の評価をお願い」「evaluate-impact」

```markdown
---
name: evaluate-impact
description: PR_WORKFLOW.md に基づいて実装の影響度（LOW/MID/HIGH）を評価し、HIGH判定となった場合は決定事項としてADR（Architectural Decision Record）を自動作成するスキル。
---

# Evaluate Impact & Create ADR Skill / 影響度評価＆ADR自動生成スキル

## 目的

`docs/05-operations/PR_WORKFLOW.md` の運用ガイドラインに基づき、作業完了時の影響度を自己評価します。その結果がアーキテクチャや広範囲に影響を与える「HIGH」であると判定された場合、自動的にその背景と決定事項を抽出してADRとして記録します。

## トリガー

「影響度を調査して」「影響度の評価をお願い」「evaluate-impact」

## 実行手順

1. **実装内容とPR_WORKFLOW.mdの確認**:
   ユーザーが完了した機能（変更コードや一連の会話で決定した内容）を把握し、`docs/05-operations/PR_WORKFLOW.md` に記載されている `LOW`, `MID`, `HIGH` の定義と照らし合わせます。

2. **影響度判定の提示**:
   評価結果（LOW/MID/HIGH）とその根拠となる理由をユーザーに明確に提示します。
   - **LOW**: 単独のファイルやコンポーネントに閉じた変更であることを伝えます。
   - **MID**: 共通関数やスキーマなどに影響しているため、関連ドキュメント（PATTERNS.mdなど）の更新が必要か推測して提案します。
   - **HIGH**: アーキテクチャの変更や重要ルールの追加であるため、ADR作成を含む厳格な手順へと移行します。

3. **ADRの生成（HIGH判定時、またはユーザー指示時）**:
   判定がHIGHであるか、ユーザーからADR化の指示があった場合、現状の文脈から以下のフォーマットでADRを自動生成します。
   - `docs/06-reference/adr/` ディレクトリ内の既存ファイルを走査し、次の連番を特定（例：ADR-00X.md）。
   - 「コンテキスト」「決定事項」「選定理由」「代替案と却下理由」を整理してMarkdownファイルを作成し保存します。

4. **次の品質保証アクションの提案**:
   作成完了後、「MIDの場合の波及テスト」や「HIGHの場合の validate-docs の実行」など、PR作成前に必要な残りのタスクを案内します。
```
