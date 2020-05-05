export interface PrefectureMessage {
  key: string;
  id: number;
  url: string;
  prefecture: string;
}

export type PrefectureMessageStates = {
  listData: PrefectureMessage[];
};
