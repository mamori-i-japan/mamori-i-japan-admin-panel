import accessPermission from './accessPermission';

export const langCode = 'Ja';
export const pageSize = 20;
export const HOST = '/';
export const redirectDefaultPath = () => {
  return accessPermission.accessAdminUser()
    ? HOST
    : accessPermission.accessOrganization()
      ? HOST + '/organizations'
      : HOST + 'prefectures';
};
