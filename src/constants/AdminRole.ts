type AdminRoleType = {
  name: string;
}

type AdminRoleString = 'SUPER_ADMIN_ROLE' | 'NATIONAL_ADMIN_ROLE' | 'PREFECTURE_ADMIN_ROLE' | 'ORGANIZATION_ADMIN_ROLE';

function AdminRole(role: AdminRoleString): AdminRoleType {
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

export type { AdminRole, AdminRoleString, AdminRoleType };
