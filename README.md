# Setup

### yarn berry

[docs](https://yarnpkg.com/getting-started/migration#editor-support)

```sh
yarn dlx @yarnpkg/sdks vscode
```

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
```
