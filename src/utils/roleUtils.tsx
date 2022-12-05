import { IGenericUser } from "../interfaces";

function hasRole(user: IGenericUser | undefined, rolesToContain: string[]): boolean {
  if (!user || !user.role) return false;

  let hasRole = false;
  rolesToContain.forEach(role => {
    hasRole = hasRole || user.role.name === role;
  });

  return hasRole;
}

export {hasRole}