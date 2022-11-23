interface IMessageProps {
    heading?: string;
    children: any;
    noPadding?: boolean;
    shadow?: boolean;
    close?: boolean;
}
interface IInstructionProps {
    center?: boolean;
    className?: string;
    noPadding?: boolean;
    children: any;
}
declare function Success(props: IMessageProps): JSX.Element;
declare function Error(props: IMessageProps): JSX.Element;
declare function Warning(props: IMessageProps): JSX.Element;
declare function Info(props: IMessageProps): JSX.Element;
declare function Instruction(props: IInstructionProps): JSX.Element;
declare const Message: {
    Success: typeof Success;
    Warning: typeof Warning;
    Error: typeof Error;
    Info: typeof Info;
    Instruction: typeof Instruction;
};
export { Message };
