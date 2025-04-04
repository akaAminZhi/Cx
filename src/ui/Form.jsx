import PropTypes from "prop-types";

function Form({ type, children, ...props }) {
  const commentStyle = " text-2xl";
  if (type === "modal")
    return (
      <form className={`${commentStyle} w-[40rem]`} {...props}>
        {children}
      </form>
    );
  return (
    <form className={`${commentStyle} py-6 px-12 border rounded-md`} {...props}>
      {children}
    </form>
  );
}

Form.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default Form;
