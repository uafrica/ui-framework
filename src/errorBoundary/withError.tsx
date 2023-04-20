import { ComponentType } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorState from "./ErrorState";

function withError<T>(Component: ComponentType<T>) {
  return (hocProps: any) => {
    return (
      <ErrorBoundary FallbackComponent={ErrorState}>
        <Component {...hocProps} />
      </ErrorBoundary>
    );
  };
}

export { withError };
