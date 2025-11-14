import { useEffect, useState } from 'react';

export function useFetch(fetchFn) {
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await fetchFn();
        setData(res);
        setLoading(false);
      } catch (err) {
        setErrorState({ error: err, title: 'Someting failied with GetTodod' });
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    errorState,
    data,
  };
}
