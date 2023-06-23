export type Reminder = {
  done: boolean;
  title: string;
  description: string;
  tags: Array<string>;
  createdDate?: number;
  date?: number;
  important: boolean; // will be used to color the radio accordingly
  parentID?: number;
  // deleteHandler?: (id: string) => void;
  // completeHandler?: (id: string) => void; // only relevant for uncompleted reminders, but we have to pass it because onClick can't take undefined
};
