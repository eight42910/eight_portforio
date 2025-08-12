# タスク管理（WBS / 進行）

## フェーズ

1. 設計/要件確定（本イテレーション）
2. スケルトン実装（レイアウト/ルーティング/スタイル基盤）
3. セクション実装（Hero → About → Skills → Works → Blog → Podcast → Timeline → Contact）
4. microCMS 接続（Works/Blog/Podcast）と ISR/On-demand Revalidate
5. 仕上げ（SEO/A11y/パフォーマンス/OGP）
6. リリース/運用

## タスクリスト（チェックリスト）

- [ ] ルーティング雛形作成（`app/*`）
- [ ] グローバルスタイル整備（Tailwind 設定、フォント）
- [ ] `Header`/`Footer`/`Section` の基盤
- [ ] `Hero` ブロック実装（レスポンシブ/アニメ）
- [ ] `About` ブロック実装
- [ ] `SkillsGrid` ブロック実装
- [ ] `WorksList` ブロック実装 + カード UI
- [ ] 作品データスキーマ定義（microCMS）とダミー投入
- [ ] `/works/[slug]` 詳細（CMS 連携）
- [ ] `Timeline` 実装
- [ ] `Contact` 実装（メールリンク or 外部フォーム）
- [ ] メタデータ/OGP/構造化データ
- [ ] `opengraph-image` 実装
- [ ] A11y チェック（キーボード/コントラスト）
- [ ] 画像最適化（`next/image` sizes/priority）
- [ ] Core Web Vitals 計測/改善
- [ ] ドキュメント更新（スクショ/使い方）

### Blog / Podcast

- [ ] `/blog` 一覧 + ページネーション（必要時）
- [ ] `/blog/[slug]` 記事詳細（構造化データ/目次/コードハイライト）
- [ ] `/podcast` 一覧（カード/再生導線）
- [ ] `/podcast/[slug]` 詳細（埋め込みプレイヤー/トランスクリプト）
- [ ] CMS Webhook と On-demand Revalidate

## マイルストーン

- M1: スケルトン完成（ルーティング/ヘッダー/フッター/セクション）
- M2: 主要ブロック完成（Hero/Works/Blog/Podcast の骨格と 1件表示）
- M3: CMS 連携と SEO/A11y 仕上げ
- M4: リリース

## 受け入れ基準（DoD 補足）

- Lint/Build OK、主要デバイスで UI 破綻なし
- Lighthouse 90+（Performance/Accessibility/Best Practices/SEO）
- 仕様の差分は docs へ反映済み

## リスク/対策

- デザインと実装の乖離 → 早期プレビューで調整
- 画像の最適化不足 → 自動リサイズ/`sizes` 設定の徹底
- スコープ肥大化 → MVP 優先、後続で拡張
