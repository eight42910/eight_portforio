# アーキテクチャ設計（Next.js + TypeScript + TailwindCSS）

本書は Figma デザイン（参考）に基づくポートフォリオサイトの技術アーキテクチャを定義します。

## 1. 全体像

- フレームワーク: Next.js App Router（RSC 優先）
- 言語: TypeScript（strict）
- スタイル: TailwindCSS + PostCSS
- デプロイ: Vercel（想定）
- 画像最適化: `next/image`
- メタデータ: Metadata API + OGP 自動生成

## 2. 情報設計 / ページ構成

- `/` トップ（Hero, About, Skills, Works, Timeline, Contact）
- `/works` 作品一覧（ページネーション可）
- `/works/[slug]` 作品詳細（CMS 由来のスラッグ）
- `/blog` ブログ一覧（ページネーション可、タグ/検索は後続）
- `/blog/[slug]` 記事詳細（CMS の本文/OGP 対応）
- `/podcast` 音声コンテンツ一覧（エピソードカード/再生導線）
- `/podcast/[slug]` エピソード詳細（埋め込みプレイヤー/ショーノート/トランスクリプト）
- `/about` 自己紹介（プロフィール/経歴/価値観）
- `/contact` 連絡（フォーム or 外部リンク）

更新頻度と配信戦略（目安）

- Works: 不定期（四半期毎）。ISR（`revalidate: 86400`）+ On-demand Revalidate
- Blog: 週1〜隔週。ISR（`revalidate: 3600`）+ On-demand Revalidate
- Podcast: 不定期（月1）。ISR（`revalidate: 86400`）+ On-demand Revalidate
- About/Contact: 低頻度。静的（ビルド時固定）、必要に応じて ISR

## 3. ディレクトリ構成（提案）

```
src/
  app/
    (marketing)/
      layout.tsx
      page.tsx
      opengraph-image.tsx
    works/
      page.tsx
      [slug]/
        page.tsx
    about/
      page.tsx
    contact/
      page.tsx
  components/
    ui/        # Button, Card, Badge, Dialog
    layout/    # Header, Footer, Nav, Section
    blocks/    # Hero, SkillsGrid, WorksList, Timeline, ContactForm
  content/
    works/     # 初期ステージのダミーデータ（後に CMS へ移行）
    posts/
    episodes/
  lib/
    seo/
    analytics/
    utils/
  styles/
    tailwind.css
```

## 4. コンポーネント設計

- 粒度: `ui`（原子的）→ `blocks`（セクション単位）→ `layout`（ページ枠）
- 再利用可能性を高め、見た目に依存しない API（Props）を定義
- Client/Server の分離: 状態/効果のある UI のみ Client 化

## 5. データモデル（作品）

```ts
export type Project = {
  slug: string;
  title: string;
  summary: string;
  techStack: string[];
  role: string;
  year: string;
  cover: string; // public パス or remote
  url?: string;
  repo?: string;
};
```

- 初期は `content/works/*.mdx` or `*.json` で管理。将来的に CMS へ差し替え可能

Blog 記事（概要）

```ts
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // HTML or MDX 相当（CMS 側で管理）
  tags: string[];
  publishedAt: string;
  ogImage?: string;
};
```

Podcast エピソード（概要）

```ts
export type Episode = {
  slug: string;
  title: string;
  description: string;
  audioUrl: string; // CDN or external
  durationSec?: number;
  transcript?: string;
  publishedAt: string;
  cover?: string;
};
```

## 6. スタイリング方針

- Tailwind を基本とし、複雑な UI は小さな `ui` コンポーネントへ分解
- 色/タイポは `tailwind.config` でトークン化（`primary`, `accent`, `muted` 等）
- ダークモード: `class` 戦略（`next-themes` 検討）
- モバイルファースト: Tailwind のモバイル基点で設計し、`md:` 以降で上書き
- shadcn/ui: 複雑な UI が必要な時のみ追加採用（ダイアログ/ドロップダウン等）。不要なら Tailwind 純正で実装

## 7. ルーティング/ナビゲーション

- App Router を使用、`Link` 経由の遷移
- フラグメントナビ（`/#works` など）用に `Section` コンポーネントで `id` を管理

## 8. SEO 設計

- `app/layout.tsx` でサイト共通の `metadata` を定義
- 各ページで `generateMetadata` により動的メタ（作品詳細）
- OGP 画像: `app/opengraph-image.tsx` or ページ単位で生成
- 構造化データ: JSON-LD（WebSite, Person, CreativeWork）
- Blog/Podcast 用の構造化データ: `BlogPosting`, `PodcastEpisode` を追加

## 9. パフォーマンス設計

- 画像: 適切な `sizes`、`priority`、`placeholder="blur"`
- フォント: `next/font`（サブセット化）
- 依存の遅延ロード: アニメーション/可視領域外の重い UI は `dynamic(import, { ssr: false })`
- キャッシュ: RSC のデフォルトキャッシュ、`revalidate` で ISR
- Core Web Vitals 目標: LCP < 2.5s, CLS < 0.1, INP < 200ms
- 画像最適化: `next/image` + 適切な `sizes`、CMS 画像は `next.config.mjs` の `remotePatterns` で許可

## 10. アクセシビリティ設計

- セマンティック HTML、見出し階層、ラベル/説明文の明示
- キーボード操作とフォーカスリング
- コントラスト比 AA 以上
- アニメーションは `prefers-reduced-motion` に配慮
- 音声コンテンツ: 再生/一時停止のキーボード操作、進捗読み上げ、トランスクリプト提供

## 11. エラーハンドリング

- `app/error.tsx` と `app/not-found.tsx`
- 作品詳細の 404 を適切に返却

## 12. 分析/計測（任意）

- Vercel Analytics, Speed Insights（必要に応じて）
- ブログとポッドキャストのイベント計測（クリック/再生/完走率）

## 13. デプロイ/運用

- Vercel で自動デプロイ（`develop` は Preview、`main` は Production）
- 環境変数は Vercel 管理。ローカルは `.env.local`

## 14. CMS 設計（microCMS）

- コンテンツタイプ
  - `works`: 作品（`slug/title/summary/techStack/role/year/cover/url/repo`）
  - `posts`: 記事（`slug/title/excerpt/body/tags/publishedAt/ogImage`）
  - `episodes`: エピソード（`slug/title/description/audioUrl/durationSec/transcript/publishedAt/cover`）
- 配信方式: 基本 ISR、microCMS の Webhook で On-demand Revalidate
- 下書きプレビュー: draftKey を用いてプレビュー用ルート（必要時）

## 15. データ取得/キャッシュ方針

- 既定: サーバーコンポーネントで `fetch`。`next` オプションで `revalidate` 指定
- 作品/記事/エピソード詳細: `generateStaticParams` + `revalidate`
- 一覧: ページネーション（疑似 or CMS 側）に応じてキャッシュ戦略を分離
- クライアント側の再検証が必要な場面は限定し、`useSWR` を最小限利用

## 16. 状態管理 / Client-Server 分離

- 原則 RSC。グローバル状態は原則不使用。必要時のみ `zustand` など軽量導入を検討
- テーマ/モーダル/プレイヤー等の UI 状態のみ Client Component 化
- ビジネスロジック・データ取得はサーバー側に寄せる

## 17. 開発フロー（個人開発向け）

- Git 運用: `feature/*` → `develop` → `main`。`main` 直 PR/Merge 禁止
- コミット: Conventional Commits（小さく高頻度）。1PR ≦ 300 行目安
- 柔軟性: 小粒 PR、レビューは自己チェックリスト（A11y/SEO/Perf/Docs）で代替

## 18. 実装優先度（P1 高 ↔ P3 低）

- P1: ルーティング/レイアウト/Section、Hero、Works 一覧・詳細、microCMS 連携、OGP/SEO 基盤
- P2: Blog 一覧・詳細、Podcast 一覧・詳細、テーマ、画像最適化徹底
- P3: アニメーション高度化、タグ/検索、RSS、分析イベント拡充

---

変更概要（今回の追記/更新）

- Blog・Podcast のページ構成とデータ型を追加
- microCMS を前提に CMS 設計/キャッシュ方針を追加
- モバイルファースト、画像最適化、A11y（音声）を強化
- 開発フローと実装優先度を明文化
