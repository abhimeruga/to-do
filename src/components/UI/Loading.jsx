import classes from './Loading.module.css';

export default function Loading({ text = 'Loading...' }) {
  return (
    <div className={classes.loader}>
      <div className={classes.spinner}></div>
      <div className={classes.text}>{text}</div>
    </div>
  );
}
