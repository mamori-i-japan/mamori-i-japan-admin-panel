type AdminRole = {
  name: string;
}

type AdminRoleString = 'SUPER_ADMIN_ROLE' | 'NATIONAL_ADMIN_ROLE' | 'PREFECTURE_ADMIN_ROLE' | 'ORGANIZATION_ADMIN_ROLE';

function adminRole(role: AdminRoleString): AdminRole {
  switch (role) {
    case 'SUPER_ADMIN_ROLE':
      return { name: 'Super Admin' };
    case 'NATIONAL_ADMIN_ROLE':
      return { name: 'National Admin' };
    case 'PREFECTURE_ADMIN_ROLE':
      return { name: 'Prefecutre Admin' };
    case 'ORGANIZATION_ADMIN_ROLE':
      return { name: 'Organization Admin' };
  }
}

function adminRoleFromNumber(number: number): AdminRoleString {
  switch (number) {
    case 0:
      return 'SUPER_ADMIN_ROLE';
    case 1:
      return 'NATIONAL_ADMIN_ROLE';
    case 2:
      return 'PREFECTURE_ADMIN_ROLE';
    default:
      return 'ORGANIZATION_ADMIN_ROLE';
  }
}

export type { AdminRoleString, AdminRole };
export { adminRole, adminRoleFromNumber }
