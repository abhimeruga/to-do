import moment from 'moment';
import { constants } from '../utils/constants';

export default function TaskItem({
  itemId,
  weekDay,
  weekNumber,
  historyObject,
  setFormIsDirty,
}) {
  const date = moment(new Date())
    .startOf('week')
    .clone()
    .add(weekNumber, 'days')
    .format(constants.DDMMYYYY);

  function handleTodoClick() {
    setFormIsDirty(false);
  }

  return (
    <td>
      <input
        type="checkbox"
        name={`${date}_${itemId}`}
        id={`${date}_${itemId}`}
        defaultChecked={historyObject[date].includes(itemId)}
        disabled={weekDay !== weekNumber}
        onChange={handleTodoClick}
      />
    </td>
  );
}
