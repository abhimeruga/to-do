import { useRef, useImperativeHandle } from "react";
import Button from "./UI/Button";

export default function AddTask({ ref }) {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialogRef.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialogRef}>
      <input type="text" />
      <Button label={"Add"} />

      <form method="dialog" onSubmit={handleReset}>
        <button>close</button>
      </form>
    </dialog>
  );
}
