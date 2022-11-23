import { ComponentType } from "react";
declare function withError<T>(Component: ComponentType<T>): (hocProps: T) => JSX.Element;
export { withError };
