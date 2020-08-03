import '../../stencil.core';
export declare class ProgressBarTag {
    el: HTMLStencilElement;
    progress: number;
    visible: boolean;
    baseColor: string;
    secondaryColor: string;
    containerWidth: number;
    /**
     * Lifecycle method that is called once when the component is first
     * connected to the DOM.
     */
    componentWillLoad(): void;
    /**
     * Lifecycle method that is called once when the component is fully loaded
     * and the first render() occurs.
     */
    componentDidLoad(): void;
    render(): JSX.Element;
}
