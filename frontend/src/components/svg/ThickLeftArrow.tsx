export default function ThickLeftArrow({
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
    <path d="M0.999998 15.732C-0.333335 14.9622 -0.333333 13.0378 1 12.268L20.5 1.00962C21.8333 0.239819 23.5 1.20207 23.5 2.74167V25.2583C23.5 26.7979 21.8333 27.7602 20.5 26.9904L0.999998 15.732Z"/>
    </svg>
    );
  }
