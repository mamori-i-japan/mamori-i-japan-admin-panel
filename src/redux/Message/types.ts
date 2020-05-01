export type MessageState = {
  listData: PrefectureMessage[];
}

export interface PrefectureMessage {
  key: string;
  id: number;
  url: string;
  prefecture: string;
}
