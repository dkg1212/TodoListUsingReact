import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'; // Ensure motion import comes before slices
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const [sortedTodoList, setSortedTodoList] = useState([]);

  useEffect(() => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const filteredSorted = [...todoList]
      .filter((todo) => filterStatus === 'all' || todo.status === filterStatus)
      .sort(
        (a, b) =>
          priorityOrder[b.priority || 'medium'] -
          priorityOrder[a.priority || 'medium']
      );
    setSortedTodoList(filteredSorted);
  }, [todoList, filterStatus]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(sortedTodoList);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setSortedTodoList(reorderedTasks);
  };

  const completedTasks = sortedTodoList.filter(
    (task) => task.status === 'complete'
  ).length;
  const totalTasks = sortedTodoList.length;
  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <motion.div
      className={styles.content__wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.progressBarContainer}>
        <p>Task Completion: {Math.round(completionPercentage)}%</p>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sortedTodoList.length > 0 ? (
                sortedTodoList.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <TodoItem todo={todo} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className={styles.emptyText}>No Todos</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </motion.div>
  );
}

export default AppContent;
