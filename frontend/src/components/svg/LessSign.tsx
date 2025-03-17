export default function LessSign({
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
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M10 20L0 10L10 0L11.775 1.775L3.55 10L11.775 18.225L10 20Z"/>
      </svg>
    );
  }