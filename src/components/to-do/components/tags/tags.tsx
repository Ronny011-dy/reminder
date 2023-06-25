import React from 'react';
import { useState } from 'react';

import { v1 as uuidv1 } from 'uuid';

import { Stack, Chip } from '@mui/material';

import { DatePicker } from '../date-picker/date-picker';
import { TextInput } from '../text-input/text-input';

const idGenerator = () => uuidv1();

type TagsProps = {
  date?: number;
  tags: Array<string>;
  done?: boolean;
};

const Tags: React.FC<TagsProps> = ({ date, tags, done }) => {
  const [isAdding, setIsAdding] = useState(false);

  const addTagHandler = () => setIsAdding(true);
  const acceptTagHandler = () => {
    setIsAdding(false);
  };

  const handleTagDelete = (tagToDelete: number) => () => {
    // setTagData((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
    //TODO
  };
  return (
    <Stack className="tags" direction="row" spacing={0.6}>
      {!done && (
        <Chip
          label="Add tag"
          variant="outlined"
          size="small"
          onClick={addTagHandler}
        />
      )}
      {isAdding && (
        <TextInput title="" placeholder="Enter tag" accept={acceptTagHandler} />
      )}
      {tags.map((tag, i) => {
        return done ? (
          <Chip key={idGenerator()} label={tag} size="small" />
        ) : (
          <Chip
            key={idGenerator()}
            label={tag}
            onDelete={handleTagDelete(i)}
            size="small"
          />
        );
      })}
      <DatePicker date={date} done={done} />
    </Stack>
  );
};

export { Tags };
