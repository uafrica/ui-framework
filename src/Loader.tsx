// @ts-ignore
import React from "react";
import { IBaseLoader, ILoader } from "./interfaces/loader.interface";

// Implementation
function Page(props: ILoader) {
  return (
    <BaseLoader
      spinnerClassName="h-12 w-12"
      containerClassName="mt-32"
      {...props}
    />
  );
}

function Modal(props: ILoader) {
  return (
    <BaseLoader
      spinnerClassName="h-12 w-12"
      containerClassName="mt-4"
      {...props}
    />
  );
}

function Inline(props: ILoader) {
  return (
    <BaseLoader
      spinnerClassName="h-6 w-6"
      containerClassName="mt-2 mr-2 ml-2"
      {...props}
    />
  );
}

function BaseLoader(props: IBaseLoader) {
  const { containerClassName = "", spinnerClassName = "h-8 w-8" } = props;
  return (
    <div className={`flex items-center justify-center ${containerClassName}`}>
      <div
        className={`loader border-t-primary ease-linear rounded-full border-6 border-t-6 border-primary-100 ${spinnerClassName}`}
      />
      {props.title && <div className="ml-3">{props.title}...</div>}
    </div>
  );
}

const Loader = {
  Page,
  Inline,
  Modal,
};

export { Loader };
