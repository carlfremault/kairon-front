import { useForm, SubmitHandler } from "react-hook-form";
import { Field, Fieldset } from "@headlessui/react";
import FormFieldLoading from "../components/form/FormFieldLoading";
import FormSelect from "../components/form/FormSelect";
import FormSubmitButton from "../components/form/FormSubmitButton";
import FormTextInput from "../components/form/FormTextInput";
import useExchangeOptions from "../hooks/useExchangeOptions";
import useSubmit from "../hooks/useSubmit";

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

  const { exchangeOptions, isPending } = useExchangeOptions();

  const formatData = (data: AccountFormInputs) => {
    return {
      account_name: data.accountName,
      exchange_name: data.exchange.value,
      private_key: data.privateKey,
      public_key: data.publicKey,
    };
  };

  const mutation = useSubmit<AccountFormInputs>({
    endpoint: process.env.NEXT_PUBLIC_KAIRON_API_URL + "/accounts",
    queryKey: "accounts",
    formatData,
    onSuccess: () => setShowModal(false),
  });

  const onSubmit: SubmitHandler<AccountFormInputs> = (data, event) => {
    event?.preventDefault();
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="mb-6 space-y-6">
        <Field>
          <FormTextInput
            register={register}
            name="accountName"
            placeholder="account name"
            rules={{ required: true, minLength: 1 }}
            errors={errors}
            errorMessage="Account name is required!"
          />
        </Field>
        <Field>
          {isPending ? (
            <FormFieldLoading />
          ) : (
            <FormSelect
              control={control}
              name="exchange"
              placeholder="pick an exchange ..."
              options={exchangeOptions}
              rules={{ required: true }}
              errors={errors}
              errorMessage="Exchange is required!"
            />
          )}
        </Field>
        <Field>
          <FormTextInput
            register={register}
            name="privateKey"
            type="password"
            placeholder="private key"
            rules={{ required: true, minLength: 1 }}
            errors={errors}
            errorMessage="Private key is required!"
          />
        </Field>
        <Field>
          <FormTextInput
            register={register}
            name="publicKey"
            placeholder="public key"
            rules={{ required: true, minLength: 1 }}
            errors={errors}
            errorMessage="Public key is required!"
          />
        </Field>
      </Fieldset>
      <FormSubmitButton disabled={isPending} />
    </form>
  );
};

export default AccountForm;
