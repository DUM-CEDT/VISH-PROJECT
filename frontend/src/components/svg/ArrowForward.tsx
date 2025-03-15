export default function ArrowForward({
  width = "29",
  height = "29",
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
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.5448 16.2083H4.83333V13.7917H19.5448L12.7781 7.02499L14.5 5.33333L24.1667 15L14.5 24.6667L12.7781 22.975L19.5448 16.2083Z"
      />
    </svg>
  );
}