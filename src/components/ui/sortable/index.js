import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const List = styled.div`
//   width: 100%;
// `;

// const Item = styled.div`
//   height: 40px;
//   border: 1px solid #E2E4E6;
// `;

export const Sortable = ({ List, ItemBox, Item, onDragEnd, items }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(droppableProvided) => (
        <List innerRef={droppableProvided.innerRef}>
          {this.state.items.map((item, i) => (
            <Draggable
              key={item.id}
              disableInteractiveElementBlocking={false}
              draggableId={item.id}>
              {(draggableProvided) => (
                <React.Fragment>
                  <ItemBox
                    innerRef={draggableProvided.innerRef}
                    style={draggableProvided.draggableStyle}
                    {...draggableProvided.dragHandleProps}>
                    <Item pos={i} {...item} />
                  </ItemBox>
                  {draggableProvided.placeholder}
                </React.Fragment>
            )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </List>
      )}
    </Droppable>
  </DragDropContext>
);

// export class Sortable extends React.Component {
  
//   state = {
//     items: [
//       {
//         id: '1',
//         component: (
//           <div>1</div>
//         ),
//       },
//       {
//         id: '2',
//         component: (
//           <div>2</div>
//         ),
//       }
//     ]
//   }

//   onDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }

//     // const items = reorder(
//     //   this.state.items,
//     //   result.source.index,
//     //   result.destination.index
//     // );

//     // this.setState({
//     //   items,
//     // });
//   }

//   render() {
//     const { List, Item, onDragEnd, items } = this.props;

//     return (
      
//     );
//   }
// }