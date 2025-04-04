import { HiXMark } from "react-icons/hi2";
import Button from "./Button";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import PropTypes from "prop-types";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: modalWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(modalWindowName) });
}
function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);

  const ref = useClickOutside(close);
  const styleModal =
    "fixed top-1/2 left-1/2 bg-gray-50 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg px-6 py-4 transition-all duration-500 max-h-[30rem] ";
  const overlay =
    "fixed top-0 left-0 w-full h-[100vh] z-[1000] transition-all duration-500 backdrop-blur-sm";

  if (openName !== name) return;
  return createPortal(
    <div className={overlay}>
      <div className={styleModal} ref={ref}>
        <Button onClick={close}>
          <HiXMark></HiXMark>
        </Button>
        <div>{cloneElement(children, { closeModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}
Modal.Window = Window;
Modal.Open = Open;

Modal.propTypes = { children: PropTypes.node };
export default Modal;
