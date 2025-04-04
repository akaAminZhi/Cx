import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";

function UploadDevicesForm({ closeModal }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  function handleOnsubmit(data) {
    console.log(data);
  }
  const { errors } = formState;
  function onError(error) {
    console.log(error);
  }
  return (
    <Form
      onSubmit={handleSubmit(handleOnsubmit, onError)}
      type={closeModal ? "modal" : ""}
    >
      <FormRow label="Upload csv file" error={errors?.image?.message}>
        <input
          {...register("csv_file", {
            required: "This filed required",
          })}
          id="csv_file"
          type="file"
          className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-100 file:text-violet-700
              hover:file:bg-violet-200
            "
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}

        <Button
          variation="secondary"
          type="reset"
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button>{"Upload"}</Button>
      </FormRow>
    </Form>
  );
}
UploadDevicesForm.propTypes = {
  closeModal: PropTypes.any,
};
export default UploadDevicesForm;
