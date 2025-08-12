# 開発運用ルール（Cursor/個人開発向け）

本書は、個人開発でも運用しやすい実務基準と、毎回の遵守フロー（チェックリスト）を定めます。

## 1. ブランチ/PR 運用

- ブランチ戦略: トランクベース（`main` を唯一のトランク）。大きい/リスクの高い変更時のみ `feature/*`
- PR: 自己レビュー用途。原則 `main` 宛て。マージは Squash and merge を推奨
- 1 PR ≦ 300 行目安。差分が大きい場合は分割

## 2. コミット規約

- Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `chore:`
- 例: `feat(blog): add post list page with pagination`
- コミットは小さく・意味単位。履歴の可読性を最優先

## 3. レビュー観点（自己チェック）

- 可読性/保守性（関数の責務、命名、Props の最小化）
- 型安全性（`any` 回避、null 安全、境界での型ガード）
- アクセシビリティ（ラベル/フォーカス/コントラスト/キーボード）
- パフォーマンス（画像最適化、遅延ロード、再レンダ最小化）
- SEO（Metadata、OGP、JSON-LD、カノニカル）
- セキュリティ（リンク rel、画像ドメイン、API Key 漏洩防止）
- ドキュメント（`docs/*` の更新同梱）

## 4. 毎回の遵守フロー（チェックリスト）

1. 仕様確認: `docs/architecture.md`, `docs/technical-specs.md`, `docs/design-spec.md`
2. 必要に応じて作業ブランチ作成: `git switch -c feature/<topic>`
3. 実装: RSC 優先、UI 状態のみ Client。コンテンツは MDX/JSON or microCMS
4. 静的解析: `npm run lint` / `npm run typecheck` / `npm run build`
5. ドキュメント更新: 変更に応じて `docs/*` を追記（変更点/理由/影響）
6. 自己レビュー: 上記レビュー観点をセルフチェック
7. PR 作成（宛先: `main`）: 目的/変更点/スクショ or 動画/動作確認/影響/既知課題
8. マージ: `main` に squash merge（履歴を綺麗に）。不要になったブランチは削除

## 5. 定義の明確化

- RSC/Client の原則: データ取得/整形はサーバー。UI 状態のみクライアント
- モーション: 原則は `design-spec.md` に従う（`prefers-reduced-motion` 尊重）
- 画像: `next/image` 必須。`sizes` と `priority` を適切設定

## 6. ツール/スクリプト（例）

- `npm run lint`, `npm run format`, `npm run typecheck`, `npm run build`
- リリース前: Lighthouse（Performance/Accessibility/Best/SEO ≥ 90）

## 7. Definition of Done（共通）

- 仕様/要件を満たす。Lint/Typecheck/Build OK
- A11y/SEO/Perf をセルフチェック
- ドキュメント反映済み（変更点を `docs/` に記録）
