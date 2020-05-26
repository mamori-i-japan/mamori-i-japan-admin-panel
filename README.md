# mamori-i-japan-admin-panel

Admin Panel for Japanese Exposure Notification App to fight against COVID-19 a.k.a. "まもりあいJAPAN".

## Table of Contents

1. [Architecture](#Architecture)
1. [Technology Stack](#Technology-Stack)
1. [Getting Started](#Getting-Started)
1. [Development Guideline](#Development-Guideline)
1. [Demo](#Demo)
1. [Test Reports](#Test-Reports)
1. [Contact](#Contact)
1. [Contributing](#Contributing)
1. [Code of Conduct](#Code-of-Conduct)
1. [License](#License)

## Architecture

### Overview and Data Flow Diagram

![Overview](./docs/overview.jpg)

![Data Flow Diagram](./docs/dfd.jpg)

The images made by [Miro](https://miro.com/app/board/o9J_ksGHtPE=/) (read only access).

## Technology Stack

### install

```sh
npm install
```

### Running the Application on Local


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

## Development Guideline

### Project Layout (Brief Explaination)

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

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/mamori-i-japan/mamori-i-japan-api. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Contributors

- [Zhumei SONG](https://github.com/zhumeisongsong)
- [Ryuta EBIHARA](https://github.com/ebiryu)
- [Daisuke Hirata](https://github.com/DaisukeHirata)

## Code of Conduct

Everyone interacting in the mamori-i-japan-api project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](./CODE_OF_CONDUCT.md).

## License

The app is available as open source under the terms of the [2-Clause BSD License](https://opensource.org/licenses/BSD-2-Clause).

