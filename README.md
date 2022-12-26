# snutt-ev-web

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
# server endpoints
SERVER_SIDE_CORE_API_URL=https://snutt-api-dev.wafflestudio.com
SERVER_SIDE_EV_API_URL=https://snutt-api-dev.wafflestudio.com/ev-service
NEXT_PUBLIC_CORE_API_URL=https://snutt-api-dev.wafflestudio.com
NEXT_PUBLIC_EV_API_URL=https://snutt-api-dev.wafflestudio.com/ev-service

# enable/disable react-query devtools
NEXT_PUBLIC_REACT_QUERY_DEVTOOL=true

# app env (local / dev / prod / test)
NEXT_PUBLIC_APP_ENV=local

# bundle analyze (true / false)
ANALYZE=false
```

<br/>

### 인증

사용하려는 브라우저의 cookie 에 아래 값들을 세팅해준다.

```
x-access-apikey
x-access-token
```

<br/><br/>

## Deployments

- [github actions](./.github/workflows/)
- wafflestudio k8s (작성 필요)

<br/><br/>

## Package Manager

`yarn berry` P'n'P 를 이용하고 있습니다. (zero-install)

<br/><br/>

## Testing

### e2e test

[playwright](https://playwright.dev/) 를 이용하고 있습니다.

root directory 의 [e2e](./e2e/) 폴더 아래에 페이지별로 e2e 테스트코드를 **`*.spec.ts`** 파일에 작성합니다.

```sh
yarn test:e2e
```

첫 실행일 경우 playwright 가 요구하는 브라우저 preset 을 설치해야 합니다.

```sh
npx playwright@{package.json에 명시된 버전} install
```

<br/>

### unit test

[jest](https://jestjs.io/) 를 이용하고 있습니다.

```sh
yarn test:unit
```
