import { createPortal } from "react-dom";

export default function Modal(Children: () => JSX.Element) {
  return () => {
    const modalEl = document.getElementById("modal");
    return modalEl ? createPortal(<Children />, modalEl) : null;
  };
}
