import { useState, useEffect } from "react";
import { getError } from "../utils/generalUtils";
import { useStore } from "../store";

// This works even if you do not have the store configured from the library. But should have a useStore function

// Arguments passed through should be of type object
type ObjectType = {
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
  data?: ObjectType;
  headers?: any;
  disallowDuplicateCancel?: boolean;
  retryCounter?: number;
  fetchOnInit?: boolean;
  onSuccess?: Function;
  onError?: Function;
  initialLoadingState?: boolean;
  disallowRequest?: boolean;
}

export function useSignedRequest({
  method,
  url,
  data,
  headers,
  disallowDuplicateCancel,
  retryCounter,
  fetchOnInit,
  onSuccess,
  onError,
  initialLoadingState,
  signedRequest,
  disallowRequest = false
}: IProps) {
  const store = useStore();
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(initialLoadingState ?? true);

  useEffect(() => {
    // Do not fetch on mount by default
    const fetchData = async () => {
      if (fetchOnInit) {
        await makeRequest();
      }
    };
    fetchData();
  }, []);

  const makeRequest = async (params?: ObjectType, disableLoadingState?: boolean) => {
    let responseData: any;
    let errorData: any;
    if (disallowRequest) {
      setIsLoading(false);
      return { responseData, errorData };
    }
    // Do not display or pass through loading state for the function
    if (!disableLoadingState) {
      setIsLoading(true);
    }

    setError(null);

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
        responseData = res.data;
        if (onSuccess) {
          onSuccess(res.data);
        }
      }
      if (!res.ok) {
        setError(getError(res, true));
        errorData = getError(res, true);
        if (onError) {
          onError(getError(res, true));
        }
      }
    } catch (e) {
      setError(getError(e, true));
      errorData = getError(e, true);
      if (onError) {
        onError(getError(e, true));
      }
    } finally {
      setIsLoading(false);
    }

    return { responseData, errorData };
  };

  return { response, error, isLoading, makeRequest };
}
