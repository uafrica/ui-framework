export interface ILoader {
  title?: string;
}

export interface IBaseLoader extends ILoader {
  containerClassName?: string;
  spinnerClassName?: string;
  viewBox?: string;
}
