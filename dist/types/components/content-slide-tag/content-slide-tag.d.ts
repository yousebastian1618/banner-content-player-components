import '../../stencil.core';
import SlideState from "../../common/slide-state";
export declare class ContentSlideTag {
    el: HTMLStencilElement;
    contentSlideObject: any;
    content: any;
    visible: boolean;
    opacity: number;
    animationEnd: boolean;
    status: SlideState;
    animationPromise: any;
    lastContentId: string;
    init(att: any): void;
    componentWillLoad(): void;
    componentDidUpdate(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    hideLastSlide: (event: any) => void;
    contentChanged: (event: any) => void;
    getAnimation: () => any;
    render(): JSX.Element;
}
