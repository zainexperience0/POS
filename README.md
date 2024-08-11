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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Setup

```
Set DATABASE_URL in .env file to mongodb url.
npx prisma generate
npx prisma db push
npm run dev
```
Modify /lib/schema.ts file for your prisma schema. Possible paramters are below:
```
name // this will appear in ui
slug // field in prisma schema
type  //supported input types are phoneInput, textareaInput, dateInput, switchInput, checkboxInput, selectInput, msSelectInput, radioInput, toogleInput, mstoogleInput, markdownInput, urlInput, fileInput, redirectButton
required   // true if required in db and ui
dataType    // type of data for filtering, sorting, search etc.
customClassName   //custom class of parent div of a input

options   // valid only for select, radio and toogles
backend  //["findFirst","findUnique","findMany","create","update","delete"]
frontend  //["list","view","update","delete","create"]
valueGetter: () => {
          return ""
        }    //function to get default value. Overrided by value declared in component level data 
```
