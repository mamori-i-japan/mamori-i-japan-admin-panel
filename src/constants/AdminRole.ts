type SuperAdmin = {
  name: 'Super Admin';
}

type NationalAdmin = {
  name: 'National Admin';
}

type PrefectureAdmin = {
  name: 'PrefectureAdmin';
  prefectureNumber: number;
}

type OrganizationAdmin = {
  name: 'Organization Admin';
  organizationCode: string;
}

type AdminRole = SuperAdmin | NationalAdmin | PrefectureAdmin | OrganizationAdmin;

export type { AdminRole };
