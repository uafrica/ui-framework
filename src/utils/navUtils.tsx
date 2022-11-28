function checkIfUserHasAccessToNavSection(section: INavItem[]) {
  if (section) {
    let hasAccessToSection = false;
    section.map(item => {
      if (item.displayCondition && item.hasAccess) {
        hasAccessToSection = true;
      }
    });

    return hasAccessToSection;
  } else {
    return false;
  }
}

export {checkIfUserHasAccessToNavSection}

export interface INavItem {
  displayCondition: boolean;
  displayName: string;
  hasAccess: boolean;
  icon: string;
  path: string;
}