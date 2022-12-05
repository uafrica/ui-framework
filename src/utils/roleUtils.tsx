import { IGenericUser } from "../interfaces";

function hasRole(user: IGenericUser | undefined, rolesToContain: string[]): boolean {
  if (!user || !user.role) return false;

  let hasRole = false;
  rolesToContain.forEach(role => {
    hasRole = hasRole || user.role.name === role;
  });

  return hasRole;
}

function getUserPermissions(user: IGenericUser | undefined): string[] {
  if (!user || !user.role || !user.role.permissions) return [];
  return user.role.permissions;
}

function hasAllPermissions(user: IGenericUser | undefined, permissions: string[]) {
  if (!user) return false;

  let userPermissions = getUserPermissions(user);

  let _hasAllPermissions = true;
  permissions.forEach(permission => {
    _hasAllPermissions = _hasAllPermissions || !hasPermissionInArray(userPermissions, permission);
  });

  return _hasAllPermissions;
}

function hasPermission(user: IGenericUser | undefined, permission: string) {
  let userPermissions = getUserPermissions(user);

  return hasPermissionInArray(userPermissions, permission);
}

function hasAnyPermission(user: IGenericUser | undefined, permissions: string[]) {
  if (!user) return false;

  let userPermissions = getUserPermissions(user);

  let _hasAnyPermission = false;
  permissions.forEach(permission => {
    _hasAnyPermission = _hasAnyPermission || hasPermissionInArray(userPermissions, permission);
  });

  return _hasAnyPermission;
}

function hasPermissionInArray(userPermissions: string[], permission: string) {
  let toCheck = [permission];

  let elements = permission.split("/");

  toCheck.push(elements[0] + "/" + elements[1] + "/*");

  // For endpoint-level wildcard.
  elements = permission.split(":");
  toCheck.push(elements[0] + ":*");

  // For all-wildcard
  toCheck.push("*");

  return hasCommonElement(userPermissions, toCheck);
}

// Iterate through each element in the first array and if some of them include the elements in the second array then return true.
function hasCommonElement(arr1: any[], arr2: any[]): boolean {
  return arr1.some(item => arr2.includes(item));
}

export { hasRole, getUserPermissions, hasAllPermissions, hasAnyPermission, hasPermissionInArray, hasPermission, hasCommonElement };