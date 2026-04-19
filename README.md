# minilog-admin

minilog 管理画面SPA。エントリの作成・編集・削除、写真アップロードを行う。

| 環境       | URL                                                     |
| ---------- | ------------------------------------------------------- |
| NAS (.100) | https://minilog-admin.honya.dev                         |
| Gitea      | https://gitea.honya.dev/honya-dev-minilog/minilog-admin |
| GitHub     | https://github.com/hogedev/minilog-admin                |

関連リポジトリ: [minilog-api](https://gitea.honya.dev/honya-dev-minilog/minilog-api)（API） / [minilog](https://gitea.honya.dev/honya-dev-minilog/minilog)（公開ビューア）

## 技術スタック

- React 19 / TypeScript / Vite / Tailwind CSS
- React Router / TanStack Query / Zustand（認証状態）
- Vitest / Testing Library

## デプロイ

```
Gitea push → Woodpecker CI → lint/typecheck → build & push → .100 デプロイ
  minilog-admin.honya.dev (Traefik経由)
```

## ローカル開発

```bash
npm ci
npm run dev
```

環境変数 `VITE_API_URL` で API の接続先を指定（デフォルト: `/api/v1`）。

## テスト

```bash
npm test
```
