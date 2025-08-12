# 要件定義書

本書はポートフォリオサイトの機能要件/非機能要件を定義します。デザイン参照は Figma（参考・完全一致は不要）。

## 1. 目的/ゴール

- 自己紹介/実績をモダンに提示し、問い合わせ/商談につなげる
- モバイル〜デスクトップまで快適に閲覧できる UX

## 2. ペルソナ/ターゲット

- 制作会社の採用担当/発注担当
- 技術コミュニティの同業エンジニア

## 3. サイト構成（MVP）

- トップ: Hero, About, Skills, Works, Timeline, Contact CTA
- 作品一覧 `/works`
- 作品詳細 `/works/[slug]`
- 任意ページ: `/about`, `/contact`

## 4. コンテンツ要件

- Hero: 氏名、キャッチコピー、主要リンク（GitHub, X, LinkedIn 等）
- About: 経歴サマリ、価値観、写真
- Skills: 技術カテゴリ（言語/フレームワーク/ツール）、レベル/実績
- Works: カード（サムネ/タイトル/役割/年/技術）
- Timeline: 学習/実務歴の年表
- Contact: メールリンク or 外部フォーム（Formspree など）

## 5. 機能要件

- レスポンシブ: 320px〜1440px+
- ナビゲーション: ヘッダー固定、現在地ハイライト、スムーススクロール
- ダークモード: 手動トグル + `prefers-color-scheme`
- 作品データ: MDX or JSON から静的生成（ISR で更新可能に）
- 画像最適化: `next/image`、OGP 自動生成
- フォーム: reCAPTCHA 相当のスパム軽減（後続検討）

## 6. 非機能要件

- パフォーマンス: LCP < 2.5s, CLS < 0.1, INP < 200ms
- アクセシビリティ: WCAG 2.1 AA 目標
- セキュリティ: 依存の脆弱性ゼロ、HTTP ヘッダ適用（Vercel ルール）
- 可用性: Vercel SLA に準拠

## 7. SEO 要件

- Metadata API（title/description/OG/Twitter）
- サイトマップ/robots、カノニカル URL
- 構造化データ（Person, WebSite, CreativeWork）

## 8. 対応ブラウザ/端末

- 最新のモダンブラウザ（Chromium, Firefox, Safari）
- iOS 16+, Android 12+

## 9. 運用/更新

- 作品は MDX/JSON を Git 管理し PR で追加
- テキストは i18n なし（日本語ベース、将来追加可能）

## 10. 制約/前提

- 実装前に設計確定（本ドキュメントと `architecture.md`）
- Next.js App Router 採用、RSC 優先

## 11. 除外範囲（現時点）

- ブログ機能
- 高度な CMS 連携
- 多言語対応

## 12. 受け入れ基準（概要）

- 主要ページの UI/UX がデザイン意図に合致
- 要件（機能/非機能/SEO/A11y）を満たす
- ドキュメント最新化、ビルド/デプロイ成功
