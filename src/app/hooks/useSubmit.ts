import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSubmit = <T>({
  endpoint,
  queryKey,
  formatData,
  onSuccess,
}: {
  endpoint: string;
  queryKey: string;
  formatData: (data: T) => Record<string, string | number>;
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: T) => {
      const body = formatData(data);

      return fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      onSuccess();
    },
  });

  return mutation;
};

export default useSubmit;
