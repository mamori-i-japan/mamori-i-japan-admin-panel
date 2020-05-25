# Admin Panel of まもりあい JAPAN

## Project Overview and Dataflow Diagram

![](./docs/overview.jpg)

![](./docs/dfd.jpg)

The images made by [Miro](https://miro.com/app/board/o9J_ksGHtPE=/) (read only access).

## How to develop

### install

```sh
npm install
```

### run local development env


First, create a firebase project.

Next, create .env.local file and write the API endpoint and firebaes config there.

```sh
# .env.local
REACT_APP_API_HOST=http://localhost:3001
REACT_APP_FIREBASE_API_KEY=XXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=XXXXXX
REACT_APP_FIREBASE_DATABASE_URL=XXXXXX
REACT_APP_FIREBASE_PROJECT_ID=XXXXXX
REACT_APP_FIREBASE_STORAGE_BUCKET=XXXXXX
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=XXXXXX
REACT_APP_FIREBASE_APP_ID=XXXXXX
REACT_APP_FIREBASE_MEASUREMENT_ID=
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

## Testing report

- [Internal Penetration Testing](https://docs.google.com/document/d/1OfCHe0gPAP1MTm5kr68lDkvBgg1JImvt7TguHLq5NUs/edit?usp=sharing)

## Contact

- [Contact Form](https://docs.google.com/forms/d/e/1FAIpQLSfcGM9itQ3i--GN9FUsQpdlW58Ug4Y6lcnE11N-igILDJdZlw/viewform)

## Contributors

- [Zhumei SONG](https://github.com/zhumeisongsong)
- [Ryuta EBIHARA](https://github.com/ebiryu)
- [Daisuke Hirata](https://github.com/DaisukeHirata)
