# SNUTT-web

스누티티 강의평 웹뷰

<br/><br/>

## Setup

### yarn berry

[docs](https://yarnpkg.com/getting-started/migration#editor-support)

```sh
yarn dlx @yarnpkg/sdks vscode
```

<br/>

### 환경 변수

루트 디렉토리의 `.env.local`에 아래와 같이 세팅한다.

```
# server endpoint
NEXT_PUBLIC_CORE_API_URL=https://snutt-api-dev.wafflestudio.com
NEXT_PUBLIC_EV_API_URL=https://snutt-api-dev.wafflestudio.com/ev-service

# secrets
NEXT_PUBLIC_LOCAL_ACCESS_TOKEN=youraccesstoken
NEXT_PUBLIC_LOCAL_ACCESS_APIKEY=youraccessapikey

# enable/disable react-query devtools
NEXT_PUBLIC_REACT_QUERY_DEVTOOL=true

# app env (local / dev / prod / test)
NEXT_PUBLIC_APP_ENV=local
```

<br/>

### Scripts

```sh
yarn setup-scripts
```

<br/><br/>

## Deployments

- [github actions](./.github/workflows/)
- SSG (`next export`)
- AWS S3 & Cloudfront

<br/><br/>

## Package Manager

`yarn berry` 를 이용하고 있습니다. (zero-install)

<br/><br/>

## Testing

### e2e test

[playwright](https://playwright.dev/) 를 이용하고 있습니다.

```sh
yarn test:e2e
```

첫 실행일 경우 playwright 가 요구하는 브라우저 preset 을 설치해야 합니다.

```sh
npx playwright@{package.json에 명시된 버전} install
```

<br/>

### unit test

TODO
