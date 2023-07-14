const SvgChevronLeft = ({ className }: SvgProps) => (
  <svg
    width={6}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.707.293a1 1 0 0 1 0 1.414L2.414 5l3.293 3.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgChevronLeft;
