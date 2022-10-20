import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface IIconWithBackground {
    icon: IconProp;
    color: string;
}
declare function IconWithBackground(props: IIconWithBackground): JSX.Element;
export { IconWithBackground };
