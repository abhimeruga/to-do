import { useRef } from 'react';

export default function InputCheckobx({ weekDay, props }) {
  const inputCheckboxRef = useRef(null);

  return (
    <input
      type="checkbox"
      name="sunday"
      id="sunday"
      disabled={weekDay !== 0}
      {...props}
      ref={inputCheckboxRef}
    />
  );
}
