import React from 'react';
import { useState } from 'react';

import { v1 as uuidv1 } from 'uuid';

import { Stack, Chip, Collapse, IconButton } from '@mui/material';

import { DatePicker } from '../date-picker/date-picker';
import { TextInput } from '../text-input/text-input';

import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const idGenerator = () => uuidv1();

type TagsProps = {
  date?: number;
  tags: Array<string>;
  done?: boolean;
};

const Tags: React.FC<TagsProps> = ({ date, tags, done }) => {
  // for tags component
  const [open, setOpen] = useState(false);
  // for tag adder in tags component
  const [isAdding, setIsAdding] = useState(false);
  // close tag adder if tags are collapsed
  const handleExpander = () => {
    setOpen(!open);
    setIsAdding(false);
  };

  const addTagHandler = () => setIsAdding(!isAdding);

  // const addTagHandler = () => setIsAdding(!isAdding);

  const handleTagDelete = (tagToDelete: number) => () => {
    // setTagData((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
    //TODO
  };

  return (
    <>
      <Collapse className="collapse tags" in={open} orientation="horizontal">
        <Stack className="tags" direction="row" spacing={0.6}>
          {!done && !isAdding && (
            <Chip
              label="Add tag"
              variant="outlined"
              size="small"
              onClick={addTagHandler}
            />
          )}
          <Collapse in={isAdding} orientation="horizontal">
            <TextInput
              title=""
              placeholder="Enter tag"
              accept={addTagHandler}
              autoFocus
            />
          </Collapse>

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
      </Collapse>
      <IconButton onClick={handleExpander}>
        {open ? <NavigateBeforeRoundedIcon /> : <NavigateNextRoundedIcon />}
      </IconButton>
    </>
  );
};

export { Tags };
