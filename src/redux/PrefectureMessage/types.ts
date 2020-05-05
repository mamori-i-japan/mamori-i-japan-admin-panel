export interface PrefectureMessage {
  key: string;
  id: string;
  url: string;
  prefecture: string;
}

export type PrefectureMessageStates = {
  listData: PrefectureMessage[];
};
