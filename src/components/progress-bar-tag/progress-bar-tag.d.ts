import '../../../dist/types/stencil.core';
export declare class ProgressBarTag {
    el: HTMLStencilElement;
    progress: number;
    visible: boolean;
    baseColor: string;
    secondaryColor: string;
    containerWidth: number;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): JSX.Element;
}
