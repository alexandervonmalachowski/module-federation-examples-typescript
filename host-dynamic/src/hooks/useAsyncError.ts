import { useCallback, useState } from "react";

export const useAsyncError = () => {
  const [, setError] = useState();
  return useCallback(
    (e: Error) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
};
