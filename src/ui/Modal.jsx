import PropTypes from "prop-types";

function Modal({ children }) {
  const modalContainer =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl py-[3.2rem] px-[4rem] transition-all duration-500";
  const overLay =
    "fixed top-0 left-0 w-full h-screen bg-gray-700 backdrop-blur-[4px] z-[1000] transition-all duration-500";

  const buttonStyle =
    "bg-transparent border-0 p-[0.4rem] rounded-xl translate-x-[0.8rem] transition-all duration-200 absolute top-[1.2rem] right-[1.9rem] hover:bg-gray-100";

  const svgStyle = "w-[2.4rem] h-[2.4rem] text-gray-500";
  return <div className={modalContainer}>{children}</div>;
}
Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
