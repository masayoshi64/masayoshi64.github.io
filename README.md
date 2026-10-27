# Homepage by Astro

## 開発
- 依存関係のインストール: `npm install`
- ローカルサーバー起動: `npm run dev` (http://localhost:4321)
- 型チェック: `npm run check`
- ビルド: `npm run build` (`dist/` に出力)

`main` に push すると GitHub Actions (`.github/workflows/deploy.yml`) でビルドされ、GitHub Pages に公開されます。

## 内容の更新
- 論文・発表: `src/data/publications.yaml` (日本語版・英語版で共通)
- プロフィール・職歴・学歴・ハイライト・バッジ: `src/data/profile.yaml` (`ja` / `en` を両方書きます)
- メニューや見出しなどの文言: `src/lib/site.ts` の `UI`
- プロフィール写真: `public/profile.jpg`

## 構成
| URL | 内容 |
| --- | --- |
| `/`, `/en/` | トップ (プロフィール + ハイライト + 最近の論文) |
| `/works/`, `/en/works/` | 研究 (論文・発表一覧) |
| `/profile/`, `/en/profile/` | プロフィール (職歴・学歴) |
| `/others/`, `/en/others/` | その他 (バッジ) |

旧 URL (`/fixed/works/` など) は新しい URL へリダイレクトされます。
