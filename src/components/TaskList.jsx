import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFetch } from '../hooks/useFetch';

import classes from './TaskList.module.css';

import TaskHeader from './TaskHeader';
import TaskFooter from './TaskFooter';
import TaskItem from './TaskItem';

import { addToList, addAllToList, addAllHistory } from '../store/todoListSlice';
import { fetchTodoHistory, fetchTodoList, submitTodo } from '../http/fetch';
import Loading from './UI/Loading';
import { usePost } from '../hooks/usePost';
import Modal from './UI/Modal';

export default function TaskList() {
  const [isAddTask, setIsAddTask] = useState(false);
  const [formIsDirty, setFormIsDirty] = useState(true);
  const [open, setOpen] = useState(false);
  const { state: postState, executePostFnc } = usePost();
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todoList.list);
  const inputRef = useRef(null);

  const { loading, data, errorState } = useFetch(fetchTodoList);
  let { data: history } = useFetch(fetchTodoHistory);

  useEffect(() => {
    if (data.length) {
      dispatch(addAllToList(data));
    }
  }, [data, history]);

  useEffect(() => {
    if (history.length) {
      dispatch(addAllHistory(history));
    }
  }, [history]);

  const weekDay = new Date().getDay();

  function handleAddTask() {
    setIsAddTask(true);
  }

  function hanldeCloseAddTask() {
    setIsAddTask(false);
  }

  function addTaskToList() {
    if (inputRef.current.value) {
      dispatch(
        addToList({ id: todoList.length, value: inputRef.current.value })
      );
      inputRef.current.value = '';
    }
  }

  async function handleForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    const saveData = {};
    Object.keys(formData).forEach(i => {
      const arr = i.split('_');
      if (saveData[arr[0]]) {
        saveData[arr[0]].push(+arr[1]);
      } else {
        saveData[arr[0]] = [+arr[1]];
      }
    });
    setFormIsDirty(true);
    await executePostFnc(submitTodo, saveData);
    setOpen(true);
  }

  function renderTaskItemsList(id) {
    const weekDays = [0, 1, 2, 3, 4, 5, 6];
    return weekDays.map(week => (
      <TaskItem
        key={week}
        itemId={id}
        weekDay={weekDay}
        weekNumber={week}
        historyObject={history[week]}
        setFormIsDirty={setFormIsDirty}
      />
    ));
  }

  function closeModalHandler() {
    setOpen(false);
  }

  return (
    <div>
      <h3>DO IT Today</h3>
      <Modal closeHandler={closeModalHandler} open={open} title={'Hurray!!'}>
        <p>Data submitted successfully🎉</p>
      </Modal>
      {loading && <Loading />}
      {!loading && (
        <div className="table-wrap">
          <form onSubmit={handleForm}>
            <table className={`nice-table ${classes.table}`}>
              <tbody>
                <TaskHeader />
                {todoList.map(item => {
                  if (history.length)
                    return (
                      <tr key={item.id}>
                        <td>{item.value}</td>
                        {renderTaskItemsList(item.id)}
                      </tr>
                    );
                })}
              </tbody>
              <tfoot className={classes.tfoot}>
                <tr>
                  <TaskFooter
                    isAddTask={isAddTask}
                    inputRef={inputRef}
                    handleAddTask={handleAddTask}
                    addTaskToList={addTaskToList}
                    hanldeCloseAddTask={hanldeCloseAddTask}
                    loading={postState.loading}
                    formIsDirty={formIsDirty}
                  />
                </tr>
              </tfoot>
            </table>
          </form>
        </div>
      )}
    </div>
  );
}
