import { useState, useEffect } from "react";
import { getError } from "../utils/generalUtils";
import { useStore } from "store";

// This works even if you do not have the store configured from the library. But should have a useStore function

// Arguments passed through should be of type object
type MyObject = {
  [k: string]: any;
};

type FetchResult = {
  ok: boolean;
  data?: any;
  error?: any;
  code?: number;
};

interface IProps {
  signedRequest: Function;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  url: string;
  data?: MyObject;
  headers?: any;
  disallowDuplicateCancel?: boolean;
  retryCounter?: number;
  fetchOnMount?: boolean;
  options?: {
    onSuccess?: Function;
    onError?: Function;
  };
  initialLoadingState?: boolean;
}

export function useSignedRequest({
  method,
  url,
  data,
  headers,
  disallowDuplicateCancel,
  retryCounter,
  fetchOnMount,
  options,
  initialLoadingState,
  signedRequest
}: IProps) {
  let { onSuccess, onError } = options ?? {};
  const store = useStore();
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(initialLoadingState ?? true);

  useEffect(() => {
    // Do not fetch on mount by default
    if (fetchOnMount) {
      fetchData();
    }
  }, []);

  const fetchData = async (params?: MyObject, disableLoadingState?: boolean) => {
    // Do not display or pass through loading state for the function
    if (!disableLoadingState) {
      setIsLoading(true);
    }

    setError(null);
    let fetchRes: any;
    let fetchError: any;

    let args: any = {};

    if (params) {
      args = params;
    } else {
      args = data;
    }

    try {
      let res: FetchResult = await signedRequest(
        store,
        url,
        method,
        args,
        headers,
        disallowDuplicateCancel,
        retryCounter
      );

      if (res.ok) {
        setResponse(res.data);
        fetchRes = res.data;
        if (onSuccess) {
          onSuccess(res.data);
        }
      }
      if (!res.ok) {
        setError(getError(res, true));
        fetchError = getError(res, true);
        if (onError) {
          onError(getError(res, true));
        }
      }
    } catch (e) {
      setError(getError(e, true));
      fetchError = getError(e, true);
      if (onError) {
        onError(getError(e, true));
      }
    } finally {
      setIsLoading(false);
    }

    return { fetchRes, fetchError };
  };

  return { response, error, isLoading, fetchData };
}
