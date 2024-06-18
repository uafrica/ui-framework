// @ts-ignore
import React from "react";
import { IInput } from "./interfaces/input.interface";
import { Input } from "./Input";

function SearchInput(props: IInput) {
  return <Input appendIcon="search" {...props} />;
}

export { SearchInput };
