import errorMessages from "./jaJP/errorMessages";
import successMessages from "./jaJP/successMessages";
import validationErrorMessages from "./jaJP/validationErrorMessages";

export default {
  ...errorMessages,
  ...successMessages,
  ...validationErrorMessages,
  loginTitle: 'ログイン',
  loginSubmit: 'ログイン',
  registerSubmit: '登録',
  createItem: '追加',
  editItem: '編集',
  list: '一覧',
  back: '戻る',
  cancel: 'キャンセル',
  deleteItem: '削除',
  logout: 'ログアウト',
  submit: '保存',
  content: '内容',
  prefecture: '都道府県',
  registrationDate: '登録日',
  footerCopyright: '管理画面 ©2020',
  message: 'メッセージ',
  status: '状況',
  positive: '陽性判定者',
  contact: '濃厚接触者',
  phone: '電話番号',
  address: '都道府県',
  age: '年齢',
  createdDate: '登録日',
  agreed: '情報提供への同意',
  positiveStatus: '陽性',
  negativeStatus: '陰性',
  email: 'メールアドレス',
  password: 'パスワード',
  adminUser: '管理者',
  logoutConfirmTitle: 'ログアウトしますか？',
  operation: '操作',
  organizationName: '組織名',
  organizationCode: '組織コード',
  addedByAdminEmail: '登録した人のメールアドレス',
  // TODO:
  organization: '組織情報',
  deleteConfirmTitle: '削除しますか？',
  notFound: '見つかりません',
};
