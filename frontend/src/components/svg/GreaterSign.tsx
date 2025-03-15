export default function GreaterSign({
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
        viewBox="0 0 13 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M2.025 20L0.25 18.225L8.475 10L0.25 1.775L2.025 0L12.025 10L2.025 20Z"/>
      </svg>
    );
  }