// ./svg/Plus.tsx
export default function Plus({
    width = 28,
    height = 28,
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
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M12 16H0V12H12V0H16V12H28V16H16V28H12V16Z"
          fill="#B3D4E6"
        />
      </svg>
    );
  }