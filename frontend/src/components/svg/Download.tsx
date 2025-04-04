export default function Download({
    width = 16,
    height = 16,
    className,
  }: {
    width?: number;
    height?: number;
    className?: string;
  }) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M8 12.5L3 7.5L4.4 6.05L7 8.65V0.5H9V8.65L11.6 6.05L13 7.5L8 12.5ZM2 16.5C1.45 16.5 0.979167 16.3042 0.5875 15.9125C0.195833 15.5208 0 15.05 0 14.5V11.5H2V14.5H14V11.5H16V14.5C16 15.05 15.8042 15.5208 15.4125 15.9125C15.0208 16.3042 14.55 16.5 14 16.5H2Z"/>
      </svg>
    );
  }