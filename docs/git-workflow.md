# Git/GitHub ワークフロー（個人開発・トランクベース）

本ドキュメントは、個人開発向けに簡潔・実用的な Git 運用を定義します。基本方針は「main を唯一のトランク（常にデプロイ可能）」です。

## 1. ブランチ戦略

- main: 常にビルド/テストが通る安定ブランチ（Production デプロイ基準）
- feature/\*: 大きい/破壊的/実験的な変更時のみ短命で作成（目安: 1〜2 時間超の作業）
- develop: 使用しない（簡潔化のため廃止）

## 2. 推奨ワークフロー

1. 変更が小さい場合は main で直接作業し、こまめにコミット/プッシュ
2. 大きい/リスクの高い変更のみブランチ作成:
   ```bash
   git switch -c feature/<topic>
   ```
3. 小さく意味のある単位でコミット（Conventional Commits 準拠）
4. 静的解析/型/ビルドをローカルで確認: `npm run lint` `npm run typecheck` `npm run build`
5. PR を作成（宛先: main）。自己レビュー・スクショ/要約を添付
6. マージは Squash and merge（履歴を線形に保持）、feature ブランチは削除
7. 必要に応じてタグ付け（SemVer）し、リリースノートを作成

## 3. マージ/履歴ポリシー

- マージ方式: Squash and merge（1PR=1コミット化で履歴をクリーンに）
- 履歴: 線形維持（リベース前提、マージコミットは避ける）
- リベース更新:
  ```bash
  git fetch -p
  git rebase origin/main
  ```

## 4. コミット規約（Conventional Commits）

- 例: `feat: 作品カードにシェア導線を追加`, `fix: OGP 生成のエッジケースを修正`, `docs: アーキテクチャ図を更新`
- 主な種別: `feat`, `fix`, `docs`, `refactor`, `perf`, `chore`, `test`, `build`
- 原則: 1コミット1トピック。短く頻繁に

## 5. デプロイ/環境（Vercel 前提）

- Production: `main` への push で自動デプロイ
- Preview: 任意のブランチ/PR に対して自動発行（レビュー/確認用）
- 環境変数: Vercel 側で管理。ローカルは `.env.local`

## 6. リリース（任意）

- バージョニング: SemVer（`major.minor.patch`）
- 例: `npm version patch` → `git push --follow-tags`
- GitHub Releases に変更点を要約（Conventional Commits から自動生成可）

## 7. FAQ（方針転換の理由）

- Q. なぜ develop を使わないのか？
  - A. 個人開発では main 一本化により運用コストが減り、リリース速度と履歴の明快さが上がるため
- Q. 直接 main にコミットしても良い？
  - A. 小さな変更は可。リスクの高い変更のみ `feature/*` + PR で自己レビュー
