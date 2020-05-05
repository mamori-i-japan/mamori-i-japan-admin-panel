import { AdminRoleString } from "../../constants/AdminRole";

export type AuthStates = {
  token: string | null;
  email: string | null;
  userAdminRole: AdminRoleString | null;
}
