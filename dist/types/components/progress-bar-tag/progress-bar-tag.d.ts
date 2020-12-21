import '../../stencil.core';
export declare class ProgressBarTag {
    el: HTMLStencilElement;
    progress: number;
    visible: boolean;
    baseColor: string;
    secondaryColor: string;
    containerWidth: number;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
