import { useEffect, useState } from "react";

type FetchResult<R> = {
  result: R | null;
  loading: boolean;
};

export default function useFetch<P, R>(
  params: P,
  fetchFunc: (params: P) => Promise<R>
): FetchResult<R> {
  const [result, setResult] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => fetchFunc(params))
      .then(setResult)
      .finally(() => setLoading(false));
  }, [fetchFunc, params]);

  return {
    result,
    loading,
  };
}
