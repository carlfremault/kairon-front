import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { Field, Fieldset, Input } from "@headlessui/react";
import FormFeedback from "../components/form/FormFeedback";
import FormSubmitButton from "../components/form/FormSubmitButton";

// TODO: replace with API data
import { exchangeOptions } from "../dummyData";

interface AccountFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AccountFormInputs {
  accountName: string;
  exchange: { value: string; label: string };
  privateKey: string;
  publicKey: string;
}

const AccountForm = ({ setShowModal }: AccountFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AccountFormInputs>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: AccountFormInputs) => {
      const body = {
        account_name: data.accountName,
        exchange_name: data.exchange.value,
        private_key: data.privateKey,
        public_key: data.publicKey,
      };

      return fetch(process.env.NEXT_PUBLIC_KAIRON_API_URL + "/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setShowModal(false);
    },
  });

  const onSubmit: SubmitHandler<AccountFormInputs> = (data, event) => {
    event?.preventDefault();
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="mb-6 space-y-6">
        <Field>
          <Input
            className="w-full border border-dark-grey bg-light-grey p-2 text-black placeholder:text-slate-400"
            placeholder="account name"
            {...register("accountName", { required: true, minLength: 1 })}
          />
          {errors.accountName && (
            <FormFeedback>Account name is required!</FormFeedback>
          )}
        </Field>
        <Field>
          <Controller
            name="exchange"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                options={exchangeOptions}
                placeholder="pick an exchange ..."
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
          {errors.exchange && (
            <FormFeedback>Exchange is required!</FormFeedback>
          )}
        </Field>
        <Field>
          <Input
            className="w-full border border-dark-grey bg-light-grey p-2 text-black placeholder:text-slate-400"
            placeholder="private key"
            {...register("privateKey", { required: true, minLength: 1 })}
          />
          {errors.privateKey && (
            <FormFeedback>Private key is required!</FormFeedback>
          )}
        </Field>
        <Field>
          <Input
            className="w-full border border-dark-grey bg-light-grey p-2 text-black placeholder:text-slate-400"
            placeholder="public key"
            {...register("publicKey", { required: true, minLength: 1 })}
          />
          {errors.publicKey && (
            <FormFeedback>Public key is required!</FormFeedback>
          )}
        </Field>
      </Fieldset>
      <FormSubmitButton />
    </form>
  );
};

export default AccountForm;
