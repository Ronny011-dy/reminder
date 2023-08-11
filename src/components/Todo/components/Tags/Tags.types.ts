type TagsProps = {
  date?: number;
  tags: string[];
  isReminderTextHidden: boolean;
  hideTextOnExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

export type { TagsProps };
