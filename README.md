# 在 next 專案中撰寫登入登出 API 並使用
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 用途
1. 上課中的操作範例
2. 主要是在 next 中開 API
3. 整個站只有發出使用者相關 API 與 去使用 API 的功能

## 簡介
1. 使用 next page router 撰寫使用者相關的 API，並使用
2. 使用 next-connect 來處理 router 的寫法
3. 使用 multer 處理表單整理
4. 使用 jsonwebtoken 來核發與解析 token
  因為 9.0.1 在 server 端解析時會有錯誤，所以退回 8.5.1
5. 使用環境變數檔案記錄 jsonwebtoken 密鑰
  要使用 NEXT_PUBLIC_ 開頭的變數才能 client server 都讀得到
6. 在 next config 要把要使用的外部圖片 domain 記錄進來


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
