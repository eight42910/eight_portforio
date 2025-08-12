# 技術仕様書

## ランタイム/主要バージョン（提案）

- Node.js: 20.x
- Next.js: 14.x（App Router）
- TypeScript: 5.x（strict）
- TailwindCSS: 3.4.x
- microCMS SDK: `microcms-js-sdk`

## ディレクトリ/エイリアス

- ルート: `src/`
- 推奨エイリアス: `@/components`, `@/lib`, `@/content`
- `@/features`（Blog/Podcast 等のドメイン単位で整理したい場合に使用）

## TypeScript 設定（要点）

- `strict: true`, `noUncheckedIndexedAccess: true`
- `paths` でエイリアス設定
- API レスポンス型は SDK のジェネリクスで型付け

## Tailwind 設計

- `content`: `./src/**/*.{ts,tsx}`
- カラーパレット: `primary`, `accent`, `muted`, `foreground`
- プラグイン: `@tailwindcss/typography`, `@tailwindcss/forms`（必要時）
- ベーススケール: モバイル基点（`text-base`=16px）。`clamp()` で流体タイポグラフィ採用

## 共有ユーティリティ（例）

```ts
// lib/utils/cn.ts
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
```

## UI コンポーネント API（抜粋）

```ts
// components/ui/Button.tsx
export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// components/layout/Section.tsx
export type SectionProps = {
  id?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

// components/blocks/ProjectCard.tsx
export type ProjectCardProps = {
  project: {
    slug: string;
    title: string;
    summary: string;
    techStack: string[];
    year: string;
    cover: string;
  };
};
```

## 作品データの取得

- 静的: `content/works/*.json|mdx` をビルド時に読み込み
- `generateStaticParams` と `generateMetadata` を併用
- microCMS: SDK 経由のデータ取得（`lib/cms/client.ts`）

## SEO 実装

- `app/layout.tsx` の `metadata` に既定値
- 各ページで `export const dynamic = 'force-static' | 'force-dynamic'` を適切に設定
- JSON-LD を `app/(marketing)/page.tsx` 等に挿入
- `BlogPosting`/`PodcastEpisode` の schema を追加

## OGP 画像

- `app/opengraph-image.tsx` を実装し、サイト/作品ごとに動的生成
- 記事/エピソードはタイトルとブランドカラーを組み合わせたテンプレートで生成

## フォント

- `next/font` で Google Fonts をサブセット化
- 見出し/本文のスケールを `text-[clamp()]` で可変
- 可読性優先（和文: Noto Sans JP 等、欧文: Inter 等）

## 分析/監視（任意）

- `@vercel/analytics/react`、`@vercel/speed-insights/next`
- 再生/クリック等のイベント送信ユーティリティ `lib/analytics/events.ts`

## 品質ゲート

- ESLint + Prettier を必須
- 重要ロジックは unit テスト（必要に応じて）
- Lint/Format/Typecheck を PR 前提条件に

## セキュリティ

- 外部リンクは `rel="noopener noreferrer"`
- 画像ドメインは `next.config.mjs` で許可リスト化
- CMS API Key はサーバー専用環境変数（Public でない）。Draft プレビュー時のみ `draftKey` を使用

## microCMS クライアント

```ts
// lib/cms/client.ts
import { createClient } from 'microcms-js-sdk';

export const cmsClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// 型例
export type CmsListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
```

## 画像最適化方針

- すべて `next/image` 経由。`fill`/`sizes` を適切に指定
- CMS 画像は `remotePatterns` で許可し、必要に応じて `width`/`quality` クエリを付与
- 重要ビジュアルは `priority`、折りたたみ領域は遅延

## モバイルファースト

- Tailwind モバイル基点で設計し、`md:` 以降で段階的に拡張
- タップターゲット 44px 以上、可読行長 45–75 字、余白十分

## クライアント/サーバー分離と状態管理

- データ取得/整形は RSC 側。UI 状態（テーマ、モーダル、プレイヤー）は Client
- 状態管理は原則不要。必要時のみ `zustand` を採用

## 環境変数

- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`
- `NEXT_PUBLIC_SITE_URL`
