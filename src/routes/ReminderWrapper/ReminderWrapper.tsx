import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import { Root, StyledListsWrapper } from './ReminderWrapper.styles';
import { ReminderListParent } from './components/ReminderListParent/ReminderListParent';
import { SubHeader } from './components/SubHeader/SubHeader';

import { Toaster } from 'react-hot-toast';
import { flat } from './utils/ReminderWrapper.util';
import { useQueryMove } from '../../api/reactQueryMutations';
import { ReminderListSub } from './components/ReminderListSub/ReminderListSub';
import { useQueryClient } from 'react-query';

export const ReminderWrapper: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersArr, setTagsToFilterArr] = useState<string[]>([]);
  const [reminderListOpacity, setReminderListOpacity] = useState(1);
  const [parentID, setParentID] = useState<string | undefined>(undefined);
  const [clickawayShouldHide, setClickAwayShouldHide] = useState(true);
  const queryClient = useQueryClient();
  const sharedListsData = {
    parentID,
    setParentID,
    clickawayShouldHide,
    setClickAwayShouldHide
  };
  const [draggableId, setDraggableId] = useState('');
  const moveMutation = useQueryMove();
  const listProps = {
    searchQuery,
    filtersArr,
    draggableId,
    setDraggableId,
    sharedListsData
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    // if the destination is null - not in a droppable
    if (!destination) return;
    const start = source.droppableId;
    const finish = destination.droppableId;
    // if the reminder was placed in the same slot it was in before
    if (finish === start && destination.index === source.index) return;
    setReminderListOpacity(0);
    const parentReminders = flat(queryClient.getQueryData(['reminders']));
    const subreminders = flat(queryClient.getQueryData(['subreminders']));

    if (finish === start) {
      const flatData = finish === 'parent' ? parentReminders : subreminders;
      const sourceReminder = flatData.filter((reminder) => reminder.id === draggableId)[0];
      const destinationReminder = flatData[destination.index];
      if (!destinationReminder.orderID || !sourceReminder.orderID) return;
      const condition = sourceReminder.orderID < destinationReminder.orderID;
      const indexOfUpperReminder = condition ? destination.index - 1 : destination.index;
      const indexOfBottomReminder = condition ? destination.index : destination.index + 1;
      const upperReminder = flatData[indexOfUpperReminder];
      const bottomReminder = flatData[indexOfBottomReminder];
      moveMutation.mutate({ sourceReminder, destinationReminder, upperReminder, bottomReminder });
      setReminderListOpacity(1);
      setDraggableId(destinationReminder.id);
      return;
    }
    // destination and source columns are not the same

    const sourceColumn = start === 'parent' ? parentReminders : subreminders;
    const destinationColumn = finish === 'parent' ? parentReminders : subreminders;
    //TODO - make sure you remember that cache and server are seperate logics
    // there isn't any "bigger then..." or "smaller then..." in cross column movement
    //? take the upper and bottom as before?
    //* if we go from parent to child - put parentID, else, remove parentID - put null
    //* for cache, we need to actually move the reminder cross cache!
    //* because the reminders and subreminders columns are seperate
    //* so remove from the source column and add to destination column
    //TODO check egghead tutorial
  };

  return (
    <Root>
      <Toaster />
      <SubHeader
        searchHandler={setSearchQuery}
        setTagsToFilterArr={setTagsToFilterArr}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <StyledListsWrapper opacity={reminderListOpacity}>
          <ReminderListParent {...listProps} />
          <ReminderListSub {...listProps} />
        </StyledListsWrapper>
      </DragDropContext>
    </Root>
  );
};
