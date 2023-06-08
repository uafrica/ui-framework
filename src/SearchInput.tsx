import { IInputProps } from "./interfaces/inputProps.interface";
import { Input } from "./Input";

function SearchInput(props: IInputProps) {
  return <Input appendIcon="search" {...props} />;
}

export { SearchInput };
