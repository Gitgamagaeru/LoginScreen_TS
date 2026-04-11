<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Git Workflow
1. Issueを確認し、受け入れ基準を理解する
2. feature/#<Issue番号>-<説明> 形式でブランチを作成
3. 受け入れ基準に基づいて実装（7文書を参照）
4. Conventional Commits形式でコミット
5. PRを作成し、developブランチにマージ

## ドキュメント作成ルール
1. ドキュメントは必ず日本語で作成する
2. 理解を助けるための補足的な文書は必ずdocs/99-memo/に記載する
3. テンプレートは順守すること。（記載がない場合でも「なし」と明記する）
4. srcを追加した際ドキュメントを更新する。

## プロジェクト仕様 以下の文書を必ず参照してからタスクに着手すること： 
- docs/MASTER.md（プロジェクト全体の索引） 
- docs/ARCHITECTURE.md（システム設計と制約） 
- docs/PATTERNS.md（実装パターンとアンチパターン） 
- docs/TESTING.md（テスト戦略と具体的なパターン） 

### README.md 
- プロジェクト概要 → MASTER.mdに転記 
- セットアップ手順 → DEPLOYMENT.mdに転記 
### 既存ドキュメント 
- API仕様書 → ARCHITECTURE.mdに転記 
- ER図 → DOMAIN.mdに転記 
- テスト手順 → TESTING.mdに転記 
### コード内コメント 
- 重要なビジネスロジック → DOMAIN.mdに転記 
- 設計意図のコメント → ARCHITECTURE.mdに転記 
### チャットログ・議事録 
- 技術選定の経緯 → ARCHITECTURE.md（ADR）に転記 
- 要件の合意事項 → PROJECT.mdに転記