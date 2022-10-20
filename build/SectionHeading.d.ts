import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface ISectionHeading {
    children: any;
    icon?: IconProp;
    iconColor?: string;
    editIconClassName?: string;
    toggleEditMode?: any;
    hideEditMode?: boolean;
    center?: boolean;
    marginTop?: boolean;
    noMarginBottom?: boolean;
    options?: any;
}
declare function SectionHeading(props: ISectionHeading): JSX.Element;
export { SectionHeading };
