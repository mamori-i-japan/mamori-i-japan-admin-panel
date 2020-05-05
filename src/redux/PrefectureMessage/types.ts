import { FirebaseDate } from '../../apis/types';

export interface PrefectureMessage {
  key: string;
  id: string;
  prefectureId: string;
  url: string;
  message: string | null;
  createdAt: FirebaseDate;
  updatedAt: FirebaseDate;

}

export type PrefectureMessageStates = {
  listData: PrefectureMessage[];
};
