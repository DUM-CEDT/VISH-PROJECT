export default function DropDownArrow({
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
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M8.26795 17C9.03775 18.3333 10.9623 18.3333 11.7321 17L19.5263 3.5C20.2961 2.16667 19.3338 0.5 17.7942 0.5H2.20577C0.666171 0.5 -0.29608 2.16667 0.47372 3.5L8.26795 17Z"/>
      </svg>
    );
  }