interface IAccordion {
    className?: string;
    title: any;
    overrideOpen?: boolean;
    children: any;
    onDelete?: any;
    backgroundColor?: string;
    textColor?: string;
    noCaret?: boolean;
    caretColor?: string;
    endComponent?: any;
}
declare function Accordion(props: IAccordion): JSX.Element;
declare namespace Accordion {
    var defaultProps: {
        backgroundColor: string;
        textColor: string;
        caretColor: string;
        endComponent: null;
    };
}
export default Accordion;
