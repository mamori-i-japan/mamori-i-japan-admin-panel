# Admin Panel of まもりあい JAPAN

## Project Overview and Dataflow Diagram

![](./docs/overview.jpg)

![](./docs/dfd.jpg)

[The images made by miro (read only access)](https://miro.com/app/board/o9J_ksGHtPE=/)

## How to develop

### install

```sh
npm install
```

### run local development env

First, create .env.local file and write the API endpoint there.

```sh
# .env.local
REACT_APP_API_HOST=https://example.com
```

Create a firebase project and write your config in the [lines](https://github.com/codeforjapan/contact-tracing-admin-panel/blob/master/src/utils/firebase.ts#L17:L26) of src/utils/firebase.ts .

```ts
// src/utils/firebase.ts
...
  // replace these values to your firebase project's one
  firebaseConfig = {
    apiKey: 'xxx',
    authDomain: 'xxx',
    databaseURL: 'xxx',
    projectId: 'xxx',
    storageBucket: 'xxx',
    messagingSenderId: 'xxx',
    appId: 'xxx',
    measurementId: 'xxx',
  };
...
```

Then, run dev server.

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

Please set environment variables of your CircleCI like .env.template file.

## Specification description

### UI library

    https://ant.design/components/button/

### Feedback

Success is green alert

    https://ant.design/components/alert/

    {
      submitSuccess: '内容を保存しました！',
      deleteSuccess: '内容を削除しました！',
      loginSuccess: 'ログインしました！',
      logoutSuccess: 'ログアウトしました！',
      createAdminUserSuccess: '管理者を追加しました！追加した管理者にメールを送信しました！',
      loginByAuthLink: 'メールを確認し、認証リンクでログインしてください。',
    }

Error is red alert

    https://ant.design/components/alert/

    API errors:
      {
        badRequest: 'サーバーへの要求が正しくありません。',　// 400
        unauthorized: '認証に失敗しました。', // 401
        internalServerError: 'サーバー内でエラーが発生しました。', // 5xx
        UnexpectedError: '不明なエラーが発生しました。', // no error response
        adminUserIsExistError:'このメールアドレスは別の管理者アカウントですでに使用されています。', // POST admins/uers 400
      }

    Firebase errors:
      https://firebase.google.com/docs/storage/web/handle-errors

Form validation

    {
      isRequired: '入力してください。',
      isInvalidEmail: '有効なメールアドレスを入力してください。'
      isInvalidURL: '有効なURLを入力してください。'
    }

Confirm modal

    https://ant.design/components/modal/#components-modal-demo-confirm
