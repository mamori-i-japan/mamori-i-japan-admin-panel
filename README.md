# Admin Panel of まもりあいJAPAN

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

## Specification description　仕様説明

#### List screens 一覧画面系

第一ソートキー、ソート順
ページングは前へ・次へ しかないので、先頭ページへ・最終ページへ を設置してはどうか？ << と >> が合ったほうがいいのでは？

#### Form screens フォーム画面系

許容可能な桁数・文字種

#### Feedback フィードバック系
成功メッセージ

エラーメッセージ



#### Firebase
メールリンク認証のリンク有効期限

送信メールのタイトル・本文

Firebaseのエラーメッセージ

####　Business 業務系

デフォルトメッセージのURLはこの画面で編集できなくていいのでは？
　　→必要仕様ではありません。時間あれば、対応する。

デフォルトメッセージのURLの設定が必須ではなくて、設定がない場合はデフォルトに設定されているものが表示されることが分かるようになっていたほうが良いのでは？
　　→設定がない場合、empty stringの方がいいと思います。デフォルトに設定されているものが表示されることはApp側でするの方がいいと思います。

デフォルトメッセージが最終行に表示されているが、先頭行にあった方がわかりやすくないか？
　　→必要仕様ではありません。時間あれば、対応する。

URLを消す場合どうする？Edit でURL部分をブランクにすればいいけど、それがパッと分かりにくい。削除ボタンを設置するのがいいか要検討。
　　→削除API無いので、削除ボタンを設置しないの方がいいと思います。URLを消す場合、empty stringを保存することができます。
