# Monsters - Web frontend

Project is simple client made in react for monsters game.

## 1. How to start

### Install dependencies

```shell
npm install / yarn
```

### Prepare environment

```shell
npm run prepareHooks / yarn prepareHooks
chmod +x .husky/pre-commit
```

## 2. How to build

```shell
npm run build / yarn build
```

If you even encounter strange build behavior, tsconfig is set to create build with cache. Set option `incremental` in
tsConfig to false

## 3. Required params in .env and .prod.env files

```env
REACT_APP_BACKEND = Server's http address
REACT_APP_WS_BACKEND = Server's websocket address
REACT_APP_REDIRECT_URL = Redirect url for oidc login. Currently, server has hardcodded url `http://localhost:3005/login`, which is where I host my react app for development. This WILL change in the future
REACT_APP_CLIENT_SECRET = Oidc client's secret
REACT_APP_CLIENT_ID = Oidc client's id
```

You can edit example.env, since it includes all required params

## This project is using fontello icons. They can be found in /src/style/fontello. All credits go to their original authors
