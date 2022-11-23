declare type ObjectType = {
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
}
export declare function useSignedRequest({ method, url, data, headers, disallowDuplicateCancel, retryCounter, fetchOnInit, onSuccess, onError, initialLoadingState, signedRequest }: IProps): {
    response: any;
    error: string | null;
    isLoading: boolean;
    makeRequest: (params?: ObjectType | undefined, disableLoadingState?: boolean | undefined) => Promise<{
        responseData: any;
        errorData: any;
    }>;
};
export {};
