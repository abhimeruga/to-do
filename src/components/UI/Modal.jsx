import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

import classes from './Modal.module.css';

export default function Modal({ open, closeHandler, title, children }) {
  const dialogRef = useRef();
  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={classes.modal}>
      <header>
        <h4 className={classes.title}>{title}</h4>
        <span onClick={closeHandler} className={classes.cancelCross}>
          ⨉
        </span>
      </header>
      <main>{children}</main>
    </dialog>,
    document.getElementById('modal')
  );
}
