import { useForm, SubmitHandler } from "react-hook-form";
import { Field, Fieldset } from "@headlessui/react";
import FormFieldLoading from "../components/form/FormFieldLoading";
import FormSelect from "../components/form/FormSelect";
import FormSubmitButton from "../components/form/FormSubmitButton";
import useAccountOptions from "../hooks/useAccountOptions";
import useMarketOptions from "../hooks/useMarketOptions";
import useSubmit from "../hooks/useSubmit";

interface MarketFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MarketFormInputs {
  account: {
    id: number;
    value: string;
    label: string;
  };
  market: { value: string; label: string };
}

const MarketForm = ({ setShowModal }: MarketFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<MarketFormInputs>();

  const selectedAccount = watch("account");

  const { accountOptions, isPending: accountOptionsPending } =
    useAccountOptions();
  const { marketOptions, isPending: marketOptionsPending } = useMarketOptions(
    selectedAccount?.id,
  );

  const formatData = (data: MarketFormInputs) => {
    return {
      account_id: data.account.id,
      market_name: data.market.value,
    };
  };

  const mutation = useSubmit<MarketFormInputs>({
    endpoint: process.env.NEXT_PUBLIC_KAIRON_API_URL + "/markets",
    queryKey: "markets",
    formatData,
    onSuccess: () => setShowModal(false),
  });

  const onSubmit: SubmitHandler<MarketFormInputs> = (data, event) => {
    event?.preventDefault();
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="mb-6 space-y-6">
        <Field>
          {accountOptionsPending ? (
            <FormFieldLoading />
          ) : (
            <FormSelect
              control={control}
              name="account"
              placeholder="choose an account ..."
              options={accountOptions}
              rules={{ required: true }}
              errors={errors}
              errorMessage="Account is required!"
            />
          )}
        </Field>
        <Field>
          {marketOptionsPending ? (
            <FormFieldLoading />
          ) : (
            <FormSelect
              control={control}
              name="market"
              placeholder={
                !selectedAccount
                  ? "choose an account first"
                  : "pick a market ..."
              }
              options={marketOptions}
              rules={{ required: true }}
              errors={errors}
              errorMessage="Market is required!"
            />
          )}
        </Field>
      </Fieldset>
      <FormSubmitButton />
    </form>
  );
};

export default MarketForm;
