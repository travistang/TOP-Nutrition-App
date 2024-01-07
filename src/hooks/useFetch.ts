import { useCallback, useEffect, useState } from "react";

type FetchResult<R> = {
  result: R | null;
  loading: boolean;
  refetch: () => void;
};

export default function useFetch<P, R>(
  params: P,
  fetchFunc: (params: P) => Promise<R>
): FetchResult<R> {
  const [result, setResult] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const refetch = useCallback(() => {
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => fetchFunc(params))
      .then(setResult)
      .finally(() => setLoading(false));
  }, [fetchFunc, params]);

  useEffect(refetch, [refetch]);
  return {
    result,
    loading,
    refetch,
  };
}
