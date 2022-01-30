import { useState } from "react";

function useToggle() {
  const [data, setData] = useState(false);

  function onClose() {
    setData(false);
  }
  function onOpen() {
    setData(true);
  }
  return [data, onClose, onOpen];
}
export default useToggle;
