import * as React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided
} from "react-beautiful-dnd";
import "./styles.css";
interface IList {
  id: string;
  title: string;
  color: string;
}

const list: IList[] = [
  {
    id: "1",
    title: "Apple",
    color: "red"
  },
  {
    id: "2",
    title: "Samsung",
    color: "blue"
  },
  {
    id: "3",
    title: "Nokia",
    color: "green"
  }
];

export default function App() {
  const [items, setItems] = React.useState<IList[]>(list);
  const dragHandler = (result: any) => {
    if (!result.destination) {
      return;
    }
    let list: IList[] = [...items];
    const [reorderedItem] = list.splice(result.source.index, 1);
    list.splice(result.destination.index, 0, reorderedItem);
    setItems(list);
  };
  return (
    <div className="App">
      <DragDropContext onDragEnd={dragHandler}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item: IList, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: DraggableProvided) => (
                    <li
                      className="sdc"
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                    >
                      {item.title}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
