import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import { Field, Fieldset } from "@headlessui/react";
import FormFeedback from "../components/form/FormFeedback";
import FormFieldLoading from "../components/form/FormFieldLoading";
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
                    noOptionsMessage: () => "py-4",
                    option: () => "p-2 hover:bg-dark-grey",
                    indicatorsContainer: () =>
                      "bg-dark-grey text-dark-grey w-14",
                  }}
                  {...field}
                />
              )}
            />
          )}
          {errors.account && <FormFeedback>Account is required!</FormFeedback>}
        </Field>
        <Field>
          {marketOptionsPending ? (
            <FormFieldLoading />
          ) : (
            <Controller
              name="market"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isDisabled={!selectedAccount}
                  options={marketOptions}
                  placeholder={
                    !selectedAccount
                      ? "choose an account first"
                      : "pick a market ..."
                  }
                  unstyled
                  classNames={{
                    container: () => "border border-dark-grey",
                    control: () => "bg-light-grey text-black pl-2 ",
                    placeholder: () => "text-slate-400",
                    menu: () =>
                      "bg-light-grey text-black border border-dark-grey space-y-4 absolute left-0",
                    noOptionsMessage: () => "py-4",
                    option: () => "p-2 hover:bg-dark-grey",
                    indicatorsContainer: () =>
                      "bg-dark-grey text-dark-grey w-14",
                  }}
                  {...field}
                />
              )}
            />
          )}
          {errors.market && <FormFeedback>Market is required!</FormFeedback>}
        </Field>
      </Fieldset>
      <FormSubmitButton />
    </form>
  );
};

export default MarketForm;
