import * as React from "react";

const SvgShuffle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m18.05 9.201-.817 3.484c-.7 3.008-2.083 4.225-4.683 3.975a8.756 8.756 0 0 1-1.35-.225L9.8 16.1c-3.475-.825-4.55-2.541-3.733-6.025l.816-3.491c.167-.709.367-1.325.617-1.834.975-2.016 2.633-2.558 5.417-1.9l1.392.325c3.491.817 4.558 2.542 3.741 6.025Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m9.717 10.833 2.416.617m.417 5.208c-.517.35-1.167.642-1.958.9l-1.317.434c-3.308 1.066-5.05.175-6.125-3.134l-1.067-3.291C1.017 8.258 1.9 6.508 5.208 5.442l1.317-.434c.342-.108.667-.2.975-.258-.25.508-.45 1.125-.617 1.833l-.816 3.492c-.817 3.483.258 5.2 3.733 6.025l1.4.333c.483.117.933.192 1.35.225Zm-2.017-9.05 4.042 1.025-4.042-1.025Z"
    />
  </svg>
);

export default SvgShuffle;
