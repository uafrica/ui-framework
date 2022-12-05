export interface IGenericUser {
  account_id: number;
  created_by: string;
  email: string;
  role: { id: number; name: string; permissions: string[], permissions_ui: string[] };
  role_id: number;
  name: string;
  phone_number: string;
  time_created: Date;
  time_modified: Date;
  username: string;
  status: string;
  access_key: string;
  cognito_sub: string;
  api_key?: string;
  secret_key?: string;
}

