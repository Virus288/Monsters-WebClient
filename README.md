# Monsters - Testing client

Project is simple client made in react

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3005](http://localhost:3005) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Prepare environment

```shell
npm run prepareHooks / yarn prepareHooks
chmod +x .husky/pre-commit
```

## Required params in .env and .prod.env files

```env
REACT_APP_BACKEND = Server's http address
REACT_APP_WS_BACKEND = Server's websocket address
REACT_APP_REDIRECT_URL = Redirect url for oidc login. Currently, server has hardcodded url `http://localhost:3005/login`, which is where I host my react app for development. This WILL change in the future
REACT_APP_CLIENT_SECRET = Oidc client's secret
REACT_APP_CLIENT_ID = Oidc client's id
```

You can edit example.env, since it includes all required params

## This project is using fontello icons. They can be found in /src/style/fontello. All credits go to their original authors
