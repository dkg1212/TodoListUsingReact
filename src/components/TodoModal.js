import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

const dropIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, type: 'spring', stiffness: 500 },
  },
  exit: { opacity: 0, scale: 0.9 },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
      setPriority(todo.priority || 'medium');
    }
  }, [type, todo, modalOpen]);

  useEffect(() => {
    if (modalOpen) {
      document.getElementById('title')?.focus();
    }
  }, [modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    const newTodo = {
      id: type === 'add' ? uuid() : todo.id,
      title,
      status,
      priority,
      time: format(new Date(), 'p, MM/dd/yyyy'),
    };

    dispatch(type === 'add' ? addTodo(newTodo) : updateTodo(newTodo));
    toast.success(`Task ${type === 'add' ? 'added' : 'updated'} successfully`);
    setModalOpen(false);
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className={styles.container} variants={dropIn}>
            <motion.div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>

              <label htmlFor="title">
                Title{' '}
                <span className={styles.charCount}>({title.length}/50)</span>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                  className={styles.input}
                  autoComplete="off"
                />
              </label>

              <label htmlFor="status">
                Status
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={styles.select}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>

              <label htmlFor="priority">
                Priority
                <div className={styles.priorityWrapper}>
                  {['high', 'medium', 'low'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`${styles.priorityButton} ${
                        priority === level ? styles.selectedPriority : ''
                      }`}
                      onClick={() => setPriority(() => level)} // ✅ Ensures state updates properly
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </label>

              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
