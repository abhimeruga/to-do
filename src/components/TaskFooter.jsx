import classes from './TaskFooter.module.css';

export default function TaskFooter({
  isAddTask,
  inputRef,
  handleAddTask,
  addTaskToList,
  hanldeCloseAddTask,
  loading,
  formIsDirty,
}) {
  return (
    <td className={classes['td-footer']} colSpan={9}>
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
            <input placeholder="Add Task" className="input" ref={inputRef} />{' '}
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
          disabled={loading || formIsDirty}
          className={`btn btn--success ${classes['submit-btn']} `}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </td>
  );
}
