interface ILoader {
    title?: string;
}
declare function Page(props: ILoader): JSX.Element;
declare function Modal(props: ILoader): JSX.Element;
declare function Inline(props: ILoader): JSX.Element;
declare const Loader: {
    Page: typeof Page;
    Inline: typeof Inline;
    Modal: typeof Modal;
};
export { Loader };
