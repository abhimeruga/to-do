import { useEffect, useRef, useState } from "react";
import moment from "moment";

import classes from "./TaskList.module.css";
import Button from "./UI/Button";

import { useDispatch, useSelector } from "react-redux";
import { addToList, addAllToList, addAllHistory } from "../store/todoListSlice";
import { useFetch } from "../hooks/useFetch";
import { fetchTodoHistory, fetchTodoList, submitTodo } from "../http/fetch";

const DDMMYYYY = "DDMMYYYY";

export default function TaskList() {
  const [isAddTask, setIsAddTask] = useState(false);
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList.list);
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
  const today = new Date();
  const formattedDate = moment(today);
  console.log(loading, data);

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
      inputRef.current.value = "";
    }
  }

  function handleForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    const saveData = {};
    Object.keys(formData).forEach((i) => {
      const arr = i.split("_");
      if (saveData[arr[1]]) {
        saveData[arr[1]].push(+arr[2]);
      } else {
        saveData[arr[1]] = [+arr[2]];
      }
    });
    submitTodo(saveData);
  }

  return (
    <div>
      <h3>DO IT Today</h3>
      <div className="table-wrap">
        <form onSubmit={handleForm}>
          <table className={`nice-table ${classes.table}`}>
            <tbody>
              <tr>
                <th>Task</th>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
              {todoList.map((item, key) => {
                if (history.length)
                  return (
                    <tr key={item.id}>
                      <td>{item.value}</td>
                      <td>
                        <input
                          type="checkbox"
                          name={`sunday_${moment(new Date())
                            .startOf("week")
                            .add(0, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          id={`sunday_${moment(new Date())
                            .startOf("week")
                            .add(0, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          // disabled={weekDay !== 0}
                          defaultChecked={history[0][
                            moment(new Date())
                              .startOf("week")
                              .clone()
                              .add(0, "days")
                              .format(DDMMYYYY)
                          ].includes(item.id)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name={`monday_${moment(new Date())
                            .startOf("week")
                            .add(1, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          id={`monday_${moment(new Date())
                            .startOf("week")
                            .add(1, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          defaultChecked={history[1][
                            moment(new Date())
                              .startOf("week")
                              .clone()
                              .add(1, "days")
                              .format(DDMMYYYY)
                          ].includes(item.id)}
                          // disabled={weekDay !== 1}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name={`tuesday_${moment(new Date())
                            .startOf("week")
                            .add(2, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          id={`tuesday_${moment(new Date())
                            .startOf("week")
                            .add(2, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          defaultChecked={history[2][
                            moment(new Date())
                              .startOf("week")
                              .clone()
                              .add(2, "days")
                              .format(DDMMYYYY)
                          ].includes(item.id)}
                          // disabled={weekDay !== 2}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name={`wednesday_${moment(new Date())
                            .startOf("week")
                            .add(3, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          id={`wednesday_${moment(new Date())
                            .startOf("week")
                            .add(3, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          // disabled={weekDay !== 3}
                          defaultChecked={history[3][
                            moment(new Date())
                              .startOf("week")
                              .clone()
                              .add(3, "days")
                              .format(DDMMYYYY)
                          ].includes(item.id)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name={`thursday_${moment(new Date())
                            .startOf("week")
                            .add(4, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          id={`thursday_${moment(new Date())
                            .startOf("week")
                            .add(4, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          defaultChecked={history[4][
                            moment(new Date())
                              .startOf("week")
                              .clone()
                              .add(4, "days")
                              .format(DDMMYYYY)
                          ].includes(item.id)}
                          // disabled={weekDay !== 4}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name={`friday_${moment(new Date())
                            .startOf("week")
                            .add(5, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          id={`friday_${moment(new Date())
                            .startOf("week")
                            .add(5, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          defaultChecked={history[5][
                            moment(new Date())
                              .startOf("week")
                              .clone()
                              .add(5, "days")
                              .format(DDMMYYYY)
                          ].includes(item.id)}
                          // disabled={weekDay !== 5}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name={`saturday_${moment(new Date())
                            .startOf("week")
                            .add(6, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          id={`saturday_${moment(new Date())
                            .startOf("week")
                            .add(6, "days")
                            .format(DDMMYYYY)}_${item.id}`}
                          defaultChecked={history[6][
                            moment(new Date())
                              .startOf("week")
                              .clone()
                              .add(6, "days")
                              .format(DDMMYYYY)
                          ].includes(item.id)}
                          // disabled={weekDay !== 6}
                        />
                      </td>
                    </tr>
                  );
              })}
            </tbody>
            <tfoot className={classes.tfoot}>
              <tr>
                <td className={classes["td-footer"]} colSpan={9}>
                  <div>
                    {!isAddTask && (
                      <button
                        className="btn btn--primary"
                        type="button"
                        onClick={handleAddTask}
                      >
                        Add Task
                      </button>
                    )}
                    {isAddTask && (
                      <>
                        <input
                          placeholder="Add Task"
                          className="input"
                          ref={inputRef}
                        />{" "}
                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={addTaskToList}
                        >
                          ✓
                        </button>
                        <button
                          type="button"
                          className="btn btn--danger"
                          onClick={hanldeCloseAddTask}
                        >
                          X
                        </button>
                      </>
                    )}
                    <button
                      className={`btn btn--success ${classes["submit-btn"]}`}
                    >
                      submit
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </form>
      </div>
    </div>
  );
}
