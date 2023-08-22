import { useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Stack, Chip, Collapse } from '@mui/material';
import { DatePicker } from '../DatePicker/DatePicker';
import { useReminderIdContext } from '../../../../routes/ReminderWrapper/hooks/useReminderIdContext';
import { useReminderDoneContext } from '../../hooks/useReminderDoneContext';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import type { TagsProps } from './Tags.types';
import { Root, TagInput, AddButton } from './Tags.styles';
import { useFocus } from '../../../../hooks/useFocus';
import { useQueryUpdate } from '../../../../api/reactQueryMutations';

const Tags: React.FC<TagsProps> = ({ date, tags, isSelected }) => {
  const [tagAdderOpen, setTagAdderOpen] = useState(false);
  const [tagText, setTagText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  useFocus({
    inputRef,
    elementRendered: tagAdderOpen
  });
  const id = useReminderIdContext();
  const done = useReminderDoneContext();
  const mutation = useQueryUpdate();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      addTagHandler();
    }
  };
  const openTagAdder = () => {
    setTagAdderOpen((prev) => !prev);
  };

  const parsedCurrentTags = `${tags && tags.length > 0 ? `${[...tags.map((tag) => `"${tag}"`)]}` : ''}`;

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
      mutation?.mutate({
        id,
        req: {
          //* server compatible format - '["tag1","tag2"]'
          tags: `[${parsedCurrentTags}${tags.length > 0 ? ',' : ''}"${tagText}"]`
        }
      });
    // clear field in state when clicking 'add tag' - or else will add last valid value
    setTagText('');
  };

  const isTagAdderOpen = useMemo(() => tagAdderOpen && isSelected, [tagAdderOpen, isSelected]);

  const handleTagDelete = (tagToDelete: number) => () => {
    const filteredTags = [...tags].filter((_, i) => i !== tagToDelete);
    const parsedFilteredTags = `${filteredTags.length > 0 ? `${[...filteredTags.map((tag) => `"${tag}"`)]}` : ''}`;
    mutation?.mutate({
      id,
      req: {
        tags: `[${parsedFilteredTags}]`
      }
    });
  };

  return (
    <Root>
      <Stack
        direction="row"
        spacing={0.6}
      >
        {tags.map((tag, i) => {
          return done || tagAdderOpen ? (
            <Chip
              key={uuidv4()}
              label={tag}
              size="small"
            />
          ) : (
            <Chip
              key={uuidv4()}
              label={tag}
              onDelete={handleTagDelete(i)}
              size="small"
            />
          );
        })}
        {!done && !isTagAdderOpen && (
          <Chip
            label="Add tag"
            variant="outlined"
            size="small"
            onClick={openTagAdder}
          />
        )}
        <Collapse
          in={isTagAdderOpen}
          orientation="horizontal"
        >
          <TagInput>
            <input
              placeholder="Enter tag"
              ref={inputRef}
              value={tagText}
              onChange={tagInputChangeHandler}
              onKeyDown={handleKeyDown}
            />
            <AddButton
              onClick={addTagHandler}
              disableRipple
            >
              <AddTwoToneIcon />
            </AddButton>
          </TagInput>
        </Collapse>
        <DatePicker date={date} />
      </Stack>
    </Root>
  );
};

export { Tags };
