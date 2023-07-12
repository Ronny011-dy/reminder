import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Stack, Chip, Collapse } from '@mui/material';

import { DatePicker } from '../DatePicker/DatePicker';
import { TextInput } from '../TextInput/TextInput';
import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useReminderIdContext } from '../../../ReminderWrapper/hooks/useReminderIdContext';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { useReminderDoneContext } from '../../hooks/useReminderDoneContext';
import { updateReminderDB } from '../../../../api/functions.api';

import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import type { TagsProps } from './Tags.types';

const Tags: React.FC<TagsProps> = ({ date, tags }) => {
  const id = useReminderIdContext();
  const done = useReminderDoneContext();
  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  const [tagText, setTagText] = useState('');
  // for tags component
  const [open, setOpen] = useState(false);
  // for tag adder in tags component
  const [isAdding, setIsAdding] = useState(false);
  // close tag adder if tags are collapsed
  const handleExpander = () => {
    setOpen(!open);
    setIsAdding(false);
  };
  const openTagAdder = () => {
    setIsAdding(!isAdding);
  };

  const addTagHandler = () => {
    setIsAdding(!isAdding);
    const parsedCurrentTags = `${
      tags.length > 0 ? `${[...tags.map((tag) => `"${tag}"`)]}` : ''
    }`;

    tagText.length > 0 &&
      mutation.mutate({
        id,
        req: {
          //* server compatible format - '["tag1","tag2"]'
          tags: `[${parsedCurrentTags}${
            tags.length > 0 ? ',' : ''
          }"${tagText}"]`,
        },
      });
    // clear field in state when clicking 'add tag' - or else will add last valid value
    setTagText('');
  };

  const handleTagDelete = (tagToDelete: number) => () => {
    const filteredTags = [...tags].filter((tag, i) => i !== tagToDelete);
    const parsedFilteredTags = `${
      filteredTags.length > 0
        ? `${[...filteredTags.map((tag) => `"${tag}"`)]}`
        : ''
    }`;
    mutation.mutate({
      id,
      req: {
        tags: `[${parsedFilteredTags}]`,
      },
    });
  };

  return (
    <>
      <Collapse in={open} orientation="horizontal">
        <Stack direction="row" spacing={0.6}>
          {!done && !isAdding && (
            <Chip
              label="Add tag"
              variant="outlined"
              size="small"
              onClick={openTagAdder}
            />
          )}
          <Collapse in={isAdding} orientation="horizontal">
            {open && (
              <TextInput
                title=""
                placeholder="Enter tag"
                accept={addTagHandler}
                autoFocus
                isTag
                setTagText={setTagText}
              />
            )}
          </Collapse>
          {tags.map((tag, i) => {
            return done || isAdding ? (
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
          <DatePicker date={date} />
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
