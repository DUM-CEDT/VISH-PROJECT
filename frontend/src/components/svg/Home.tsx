export default function Home({
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
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M2.5 16H5.5V10H11.5V16H14.5V7L8.5 2.5L2.5 7V16ZM0.5 18V6L8.5 0L16.5 6V18H9.5V12H7.5V18H0.5Z"/>

      </svg>
    );
  }