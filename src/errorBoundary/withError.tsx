import ErrorState from "./ErrorState";
 // @ts-ignore
    import React, { ComponentType } from "react";
import { ErrorBoundary } from "react-error-boundary";

function withError<T>(Component: ComponentType<T>) {
  return (hocProps: T) => {
    return (
      <ErrorBoundary FallbackComponent={ErrorState}>
        {/* @ts-ignore */}
        <Component {...hocProps} />
      </ErrorBoundary>
    );
  };
}

export { withError };
