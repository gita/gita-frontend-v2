import React from "react";
import { createPopper } from "@popperjs/core";

const FooterBar = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "top-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;

  return (
    <div>
      <>
        <div className="flex flex-col max-w-7xl mx-auto md:flex-row items-center justify-between align-baseline flex-wrap font-inter">
          <div className="">
            <div className="relative inline-flex align-middle w-full">
              <button
                className={
                  "text-black flex align-middle  border font-bold border-gray-300 text-sm px-6 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                  bgColor
                }
                type="button"
                ref={btnDropdownRef}
                onClick={() => {
                  dropdownPopoverShow
                    ? closeDropdownPopover()
                    : openDropdownPopover();
                }}
              >
                Language
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                {/* {color === "white" ? "White Dropdown" : color + " Dropdown"} */}
              </button>
              <div
                ref={popoverDropdownRef}
                className={
                  (dropdownPopoverShow ? "block " : "hidden ") +
                  +"text-base z-50 float-left py-2 list-none text-left rounded shadow-lg border border-gray-300 bg-white mb-1 "
                }
                style={{ minWidth: "12rem" }}
              >
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-white "
                  }
                  onClick={(e) => e.preventDefault()}
                >
                  English
                </a>
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-white "
                  }
                  onClick={(e) => e.preventDefault()}
                >
                  Hindi
                </a>
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-white "
                  }
                  onClick={(e) => e.preventDefault()}
                >
                  Spanish
                </a>
                <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 text-gray-400">© 2021 BhagavadGita.io.</div>

          <div className="mt-4 md:mt-0">App Icon</div>
        </div>
      </>
    </div>
  );
};

export default FooterBar;
