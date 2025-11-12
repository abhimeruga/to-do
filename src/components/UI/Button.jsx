export default function Button({ label, props }) {
  const className = `bg-sky-500 w-1/6 ${props?.className}`;
  return (
    <button className={className} {...props}>
      {label}
    </button>
  );
}
