export default function Bin({
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
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M5.44444 0L4.66667 0.8H0V2.4H14V0.8H9.33333L8.55556 0H5.44444ZM1.06185 4L2.3865 16H11.6135L12.9382 4H1.06185Z"/>
      </svg>
    );
  }