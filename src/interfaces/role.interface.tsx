export interface IGenericRole {
  id?: number | undefined;
  name: string;
  permissions: any;
  permissions_ui: any;
  description: string;
  read_only: boolean;
}