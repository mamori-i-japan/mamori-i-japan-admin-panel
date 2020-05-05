import { FirebaseDate } from '../../apis/types';

export interface Organization {
  id?: string
  organizationId: string
  name: string
  message: string
  organizationCode: string
  addedByAdminUserId: string
  addedByAdminEmail: string
  createdAt: FirebaseDate
  updatedAt: FirebaseDate
}

export type OrganizationStates = {
  listData: Organization[]
  detailData: Organization | null
}
