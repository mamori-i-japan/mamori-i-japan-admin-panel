
import { FirebaseDate } from '../../apis/types';

export interface AdminUser {
  adminUserId: string
  userAdminRole: string
  userAccessKey: string
  organizationId?: string
  prefectureId?: string
  email: string
  addedByAdminUserId: string
  addedByAdminEmail: string
  created: FirebaseDate
}

export type AdminUserStates = {
  listData: AdminUser[]
  detailData: AdminUser | null
}

