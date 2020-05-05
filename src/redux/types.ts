import { AdminUserStates } from './AdminUser/types';
import { AuthStates } from './Auth/types';
import { FeedbackStates } from './Feedback/types';
import { LoadingStates } from './Loading/types';
import { PrefectureMessageStates } from './PrefectureMessage/types';
import { OrganizationStates } from './Organization/types';
import { SidebarStates } from './Sidebar/types';

export interface Store {
  adminUser: AdminUserStates
  auth: AuthStates
  feedback: FeedbackStates
  loading: LoadingStates
  prefectureMessage: PrefectureMessageStates
  organization: OrganizationStates
  sidebar: SidebarStates
}

