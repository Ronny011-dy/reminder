import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import { Root, StyledListsWrapper } from './ReminderWrapper.styles';
import { ReminderListParent } from './components/ReminderListParent/ReminderListParent';
import { SubHeader } from './components/SubHeader/SubHeader';

import { Toaster } from 'react-hot-toast';
import { flat } from './utils/ReminderWrapper.util';
import { useQueryMove } from '../../api/reactQueryMutations';
import { ReminderListSub } from './components/ReminderListSub/ReminderListSub';

export const ReminderWrapper: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersArr, setTagsToFilterArr] = useState<string[]>([]);
  const [reminderListOpacity, setReminderListOpacity] = useState(1);
  const [parentID, setParentID] = useState<string | undefined>(undefined);
  const [clickawayShouldHide, setClickAwayShouldHide] = useState(true);
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

  // const filteredAndSearchedData = useMemo(() => {
  //   return filterData(flat(data),filtersArr)?.filter((reminder) => reminder.title.includes(searchQuery));
  // }, [data, searchQuery, filtersArr]);

  const onDragEnd = (result: DropResult) => {
    console.log('Dragged');
    // const { destination, source, draggableId } = result;
    // // if the destination is null - not in a droppable
    // if (!destination) return;
    // // if the reminder was placed in the same slot it was in before
    // if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    // setReminderListOpacity(0);

    // const flatData = flat(data);
    // const sourceReminder = flatData.filter((reminder) => reminder.id === draggableId)[0];
    // const destinationReminder = flatData[destination.index];

    // if (!destinationReminder.orderID || !sourceReminder.orderID) return;

    // const condition = sourceReminder.orderID < destinationReminder.orderID;

    // const indexOfUpperReminder = condition ? destination.index - 1 : destination.index;
    // const indexOfBottomReminder = condition ? destination.index : destination.index + 1;

    // const upperReminder = flatData[indexOfUpperReminder];
    // const bottomReminder = flatData[indexOfBottomReminder];
    // moveMutation.mutate({ sourceReminder, destinationReminder, upperReminder, bottomReminder });
    // setReminderListOpacity(1);
    // setDraggableId(destinationReminder.id);
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
