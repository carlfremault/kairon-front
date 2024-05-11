import { Controller } from "react-hook-form";
import Select from "react-select";
import FormFeedback from "./FormFeedback";

interface FormSelectProps {
  control: any;
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
  rules: Record<string, string | number | boolean>;
  errors: any;
  errorMessage: string;
}

const FormSelect = ({
  control,
  name,
  placeholder,
  options,
  rules,
  errors,
  errorMessage,
}: FormSelectProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            options={options}
            placeholder={placeholder}
            unstyled
            classNames={{
              container: () => "border border-dark-grey",
              control: () => "bg-light-grey text-black pl-2 ",
              placeholder: () => "text-slate-400",
              menu: () =>
                "bg-light-grey text-black border border-dark-grey space-y-4 absolute left-0",
              noOptionsMessage: () => "py-4",
              option: () => "p-2 hover:bg-dark-grey",
              indicatorsContainer: () => "bg-dark-grey text-dark-grey w-14",
            }}
            {...field}
          />
        )}
      />
      {errors.exchange && <FormFeedback>{errorMessage}</FormFeedback>}
    </>
  );
};

export default FormSelect;
