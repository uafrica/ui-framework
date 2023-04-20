type ObjectType = {
    [k: string]: any;
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
export declare function useSignedRequest({ method, url, data, headers, disallowDuplicateCancel, retryCounter, fetchOnInit, onSuccess, onError, initialLoadingState, signedRequest, disallowRequest }: IProps): {
    response: any;
    error: string;
    isLoading: boolean;
    makeRequest: (params?: ObjectType, disableLoadingState?: boolean) => Promise<{
        responseData: any;
        errorData: any;
    }>;
};
export {};
