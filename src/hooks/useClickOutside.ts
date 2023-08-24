import { useEffect } from "react";

const isNode = (evt: EventTarget | null): evt is Node =>
  Boolean(evt && "nodeType" in evt);

export const useClickOutside = (
  ref: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  callback: () => void,
) => {
  const handleClick = (evt: MouseEvent | TouchEvent) => {
    const refs = Array.isArray(ref) ? ref : [ref];
    if (
      refs.every(
        (refItem) =>
          !refItem.current ||
          (isNode(evt.target) &&
            !refItem.current.contains(evt.target) &&
            evt.target.nodeName !== "svg"),
      )
    ) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  });
};
