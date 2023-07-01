import React from 'react';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Stack, Chip, Collapse } from '@mui/material';

import { DatePicker } from '../date-picker/date-picker';
import { TextInput } from '../text-input/text-input';
import { OptionWrapper } from '../option-wrapper/option-wrapper';

import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

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
              isTag
            />
          </Collapse>

          {tags.map((tag, i) => {
            return done ? (
              <Chip key={uuidv4()} label={tag} size="small" />
            ) : (
              <Chip
                key={uuidv4()}
                label={tag}
                onDelete={handleTagDelete(i)}
                size="small"
              />
            );
          })}
          <DatePicker date={date} done={done} />
        </Stack>
      </Collapse>
      <OptionWrapper
        title={`${open ? 'Minimize' : 'Show more'}`}
        onClick={handleExpander}
      >
        {open ? <NavigateBeforeRoundedIcon /> : <MoreVertRoundedIcon />}
      </OptionWrapper>
    </>
  );
};

export { Tags };
