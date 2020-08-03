import '../../../dist/types/stencil.core';
export declare class ContentPlayerTag {
    el: HTMLStencilElement;
    slides: any;
    currentContentId: string;
    componentDidLoad(): void;
    componentDidUnload(): void;
    loadContents: (event: any) => void;
    playNextContent: () => void;
    render(): JSX.Element;
}
