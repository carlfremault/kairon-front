"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import { Field, Fieldset } from "@headlessui/react";
import FormFeedback from "../components/Form/FormFeedback";

// TODO: replace with API data
import { accountOptions, marketOptions } from "../dummyData";
import FormSubmitButton from "../components/Form/FormSubmitButton";

interface MarketFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MarketFormInputs {
  account: { value: string; label: string };
  market: { value: string; label: string };
}

const MarketForm = ({ setShowModal }: MarketFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<MarketFormInputs>();
  const onSubmit: SubmitHandler<MarketFormInputs> = (data) => {
    console.log(data);
    setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="mb-6 space-y-6">
        <Field>
          <Controller
            name="account"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                options={accountOptions}
                placeholder="choose an account ..."
                unstyled
                classNames={{
                  container: () => "border border-dark-grey",
                  control: () => "bg-light-grey text-black pl-2 ",
                  placeholder: () => "text-slate-400",
                  menu: () =>
                    "bg-light-grey text-black border border-dark-grey space-y-4 absolute left-0",
                  option: () => "p-2 hover:bg-dark-grey",
                  indicatorsContainer: () => "bg-dark-grey text-dark-grey w-14",
                }}
                {...field}
              />
            )}
          />
          {errors.account && <FormFeedback>Account is required!</FormFeedback>}
        </Field>
        <Field>
          <Controller
            name="market"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                options={marketOptions}
                placeholder="pick a market ..."
                unstyled
                classNames={{
                  container: () => "border border-dark-grey",
                  control: () => "bg-light-grey text-black pl-2 ",
                  placeholder: () => "text-slate-400",
                  menu: () =>
                    "bg-light-grey text-black border border-dark-grey space-y-4 absolute left-0",
                  option: () => "p-2 hover:bg-dark-grey",
                  indicatorsContainer: () => "bg-dark-grey text-dark-grey w-14",
                }}
                {...field}
              />
            )}
          />
          {errors.market && <FormFeedback>Market is required!</FormFeedback>}
        </Field>
      </Fieldset>
      <FormSubmitButton />
    </form>
  );
};

export default MarketForm;
