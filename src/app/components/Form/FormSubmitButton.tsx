import { Button } from "@headlessui/react";

const FormSubmitButton = () => {
  return (
    <Button
      className="flex w-full flex-row items-center justify-center rounded-lg bg-kairon-green p-2 text-3xl text-sm text-white data-[active]:bg-kairon-green-active data-[hover]:bg-kairon-green-hover"
      type="submit"
    >
      ADD
    </Button>
  );
};

export default FormSubmitButton;
