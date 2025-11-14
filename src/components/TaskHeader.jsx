import moment from 'moment';
import classes from './TaskHeader.module.css';

export default function TaskHeader() {
  function getWeekDate(day) {
    return moment(new Date())
      .startOf('week')
      .clone()
      .add(day, 'days')
      .format('DD-MM-YYYY');
  }

  return (
    <tr>
      <th>Task</th>
      <th>
        <div>Sun</div> <div className={classes.dateTitle}>{getWeekDate(0)}</div>
      </th>
      <th>
        <div>Mon</div> <div className={classes.dateTitle}>{getWeekDate(1)}</div>
      </th>
      <th>
        <div>Tue</div> <div className={classes.dateTitle}>{getWeekDate(2)}</div>
      </th>
      <th>
        <div>Wed</div> <div className={classes.dateTitle}>{getWeekDate(3)}</div>
      </th>
      <th>
        <div>Thu</div> <div className={classes.dateTitle}>{getWeekDate(4)}</div>
      </th>
      <th>
        <div>Fri</div> <div className={classes.dateTitle}>{getWeekDate(5)}</div>
      </th>
      <th>
        <div>Sat</div> <div className={classes.dateTitle}>{getWeekDate(6)}</div>
      </th>
    </tr>
  );
}
