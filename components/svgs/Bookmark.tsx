const SvgBookmark = ({ className }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={17}
      fill="none"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M12.833 16 7 11.833 1.167 16V2.667A1.667 1.667 0 0 1 2.833 1h8.334a1.666 1.666 0 0 1 1.666 1.667V16Z"
      />
    </svg>
  );
};

export default SvgBookmark;
