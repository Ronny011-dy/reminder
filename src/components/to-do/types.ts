export type Reminder = {
  done: boolean;
  title: string;
  description: string;
  tags: Array<string>;
  createdDate?: number;
  date?: number;
  important: boolean; // can be used to color the radio accordingly
  parentID?: number;
};
