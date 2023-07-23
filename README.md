# Hello World example

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/segmentio/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```bash
npx create-next-app --example hello-world hello-world-app
# or
yarn create next-app --example hello-world hello-world-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/hello-world
cd hello-world
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

## The idea behind the example

This example shows the most basic idea behind Next. We have 2 pages: `pages/index.js` and `pages/about.js`. The former responds to `/` requests and the latter to `/about`. Using `next/link` you can add hyperlinks between them with universal routing capabilities. The `day` directory shows that you can have subdirectories.

## 작업 순서

1. 로그인 페이지
   1-1. 로그인 페이지 ( Token 발급 )
2. 가입 페이지
3. 메인 페이지
   3-1. 메인페이지 접근시 session 내용이 없을 경우 로그인 페이지로
   3-2. 데이터 호출
4. 데이터 작성 페이지(?) 아니면 입력하면 바로 보여줄수 있게끔
   4-1. 데이터 입력 및 저장
5. 좋아요 기능
6. 상세페이지 ( 모달로 할까? )
