import { FirebaseDate } from '../../apis/types';

export interface Organization {
  key: string;
  id: string;
  organizationId: string;
  name: string;
  message: string | null;
  organizationCode: string;
  addedByAdminUserId: string;
  addedByAdminEmail: string;
  createdAt: FirebaseDate;
  updatedAt: FirebaseDate;
}

export type DetailDataState = Organization | {}

export type OrganizationStates = {
  listData: Organization[];
  detailData: DetailDataState;
}
