# Admin Panel of Contact Tracing App

## Project Overview

(under construction)

## How to develop

### install
```sh
npm install
```

### run local development env
```sh
npm start
```
Open http://localhost:3000 to view it in the browser.

### test
```sh
npm run test

# test coverage
npm run test:cov
```

### build app
```sh
npm run build
```

### (eject from create-react-app)
```sh
npm run eject
```

## CI/CD

We use Circle CI as CI SaaS.
When you push your code or create PR, lint and test will run.
When the code is merged to the `develop` branch, the app will be deployed to DEV env.
