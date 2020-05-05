import { Organization } from '../redux/Organization/types';

export type FirebaseDate = {
  _seconds: string;
};

export interface CreateOrganizationRequestDto extends Organization {
  name: string;
  message: string;
}

export interface UpdateOrganizationRequestDto extends Organization {
  name: string;
  message: string;
  id: string;
}

export interface UpdatePrefectureRequestDto {
  message: string;
  id: string;
} 
