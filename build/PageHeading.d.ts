import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface IPageHeading {
    children: any;
    id?: string;
    icon?: IconProp;
    center?: boolean;
    uppercase?: boolean;
}
declare function PageHeading(props: IPageHeading): JSX.Element;
declare namespace PageHeading {
    var defaultProps: {
        uppercase: boolean;
    };
}
export { PageHeading };
