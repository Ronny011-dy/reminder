import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Stack, Chip, Collapse } from '@mui/material';
import { DatePicker } from '../DatePicker/DatePicker';
import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useReminderIdContext } from '../../../../routes/ReminderWrapper/hooks/useReminderIdContext';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { useReminderDoneContext } from '../../hooks/useReminderDoneContext';
import { updateReminderDB } from '../../../../api/functions.api';
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import type { TagsProps } from './Tags.types';
import { Root, TagsWrapper, TagInput, AddButton } from './Tags.styles';
import { useFocus } from '../../../../hooks/useFocus';

const Tags: React.FC<TagsProps> = ({
  date,
  tags,
  isReminderTextHidden,
  hideTextOnExpand,
}) => {
  const [tagCollapseOpen, setTagCollapseOpen] = useState(false);
  const [tagAdderOpen, setTagAdderOpen] = useState(false);
  const [tagText, setTagText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  useFocus({
    inputRef,
    elementRendered: tagAdderOpen,
  });
  const id = useReminderIdContext();
  const done = useReminderDoneContext();
  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      addTagHandler();
    }
  };
  // close tag adder if tags are collapsed
  const handleExpander = () => {
    setTagCollapseOpen(!tagCollapseOpen);
    setTagAdderOpen(false);
    hideTextOnExpand(!isReminderTextHidden);
  };
  const openTagAdder = () => {
    setTagAdderOpen((prev) => !prev);
  };

  const parsedCurrentTags = `${
    tags && tags.length > 0 ? `${[...tags.map((tag) => `"${tag}"`)]}` : ''
  }`;

  const tagInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagText(e.target.value);
  };

  const addTagHandler = () => {
    setTagAdderOpen((prev) => !prev);
    if (tagText.length === 0) {
      return;
    }
    // condition filters out duplicates before pushign to DB
    !tags.includes(tagText) &&
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
    <Root>
      <Collapse in={tagCollapseOpen} orientation="horizontal">
        <Stack direction="row" spacing={0.6}>
          {/* <TagsWrapper> */}
          {tags.map((tag, i) => {
            return done || tagAdderOpen ? (
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
          {/* </TagsWrapper> */}
          {!done && !tagAdderOpen && (
            <Chip
              label="Add tag"
              variant="outlined"
              size="small"
              onClick={openTagAdder}
            />
          )}
          <Collapse in={tagAdderOpen} orientation="horizontal">
            {tagCollapseOpen && (
              <TagInput>
                <input
                  placeholder="Enter tag"
                  ref={inputRef}
                  value={tagText}
                  onChange={tagInputChangeHandler}
                  onKeyDown={handleKeyDown}
                />
                <AddButton onClick={addTagHandler} disableRipple>
                  <AddTwoToneIcon />
                </AddButton>
              </TagInput>
            )}
          </Collapse>
          <DatePicker date={date} />
        </Stack>
      </Collapse>
      <OptionWrapper
        title={`${tagCollapseOpen ? 'Minimize' : 'Show more'}`}
        onClick={handleExpander}
      >
        {tagCollapseOpen ? (
          <KeyboardArrowRightTwoToneIcon />
        ) : (
          <MoreVertRoundedIcon />
        )}
      </OptionWrapper>
    </Root>
  );
};

export { Tags };
