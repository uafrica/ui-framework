declare type MyObject = {
    [k: string]: any;
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
export declare function useSignedRequest({ method, url, data, headers, disallowDuplicateCancel, retryCounter, fetchOnMount, options, initialLoadingState, signedRequest }: IProps): {
    response: any;
    error: string | null;
    isLoading: boolean;
    fetchData: (params?: MyObject | undefined, disableLoadingState?: boolean | undefined) => Promise<{
        fetchRes: any;
        fetchError: any;
    }>;
};
export {};
