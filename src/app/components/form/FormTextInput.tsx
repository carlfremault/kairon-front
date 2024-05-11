import { Input } from "@headlessui/react";
import FormFeedback from "./FormFeedback";

interface FormTextInputProps {
  register: any;
  name: string;
  type?: string;
  placeholder: string;
  errors: any;
  errorMessage: string;
}
const FormTextInput = ({
  register,
  name,
  type = "text",
  placeholder,
  errors,
  errorMessage,
}: FormTextInputProps) => {
  return (
    <>
      <Input
        className="w-full border border-dark-grey bg-light-grey p-2 text-black placeholder:text-slate-400"
        type={type}
        placeholder={placeholder}
        {...register(name, { required: true, minLength: 1 })}
      />
      {errors.accountName && <FormFeedback>{errorMessage}</FormFeedback>}
    </>
  );
};

export default FormTextInput;
