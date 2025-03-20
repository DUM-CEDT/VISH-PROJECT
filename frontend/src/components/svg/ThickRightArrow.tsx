export default function ThickRightArrow({
  width = "16px",
  height = "16px",
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M23 15.732C24.3333 14.9622 24.3333 13.0378 23 12.268L3.5 1.00962C2.16666 0.239819 0.5 1.20207 0.5 2.74167V25.2583C0.5 26.7979 2.16667 27.7602 3.5 26.9904L23 15.732Z" />
    </svg>
  );
}
