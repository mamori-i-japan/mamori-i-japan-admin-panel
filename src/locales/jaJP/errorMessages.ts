export default {
  badRequest: 'サーバーへの要求が正しくありません。',　// 400
  unauthorized: '認証に失敗しました。', // 401
  internalServerError: 'サーバー内でエラーが発生しました。', // 5xx
  UnexpectedError: '不明なエラーが発生しました。', // no error response
  adminUserIsExistError:
    'このメールアドレスは別の管理者アカウントですでに使用されています。', // POST admins/uers 400

}
