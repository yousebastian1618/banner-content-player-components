import '../../stencil.core';
declare enum PlayState {
    STOP = 0,
    PLAYING = 1
}
export declare class VideoTag {
    el: HTMLStencilElement;
    videoObject: any;
    adjustment: any;
    originX: string;
    originY: string;
    top: number;
    left: number;
    width: number;
    height: number;
    angle: number;
    scaleX: number;
    scaleY: number;
    zIndex: number;
    src: string;
    loop: boolean;
    autoplay: boolean;
    containerWidth: number;
    containerHeight: number;
    slideState: number;
    alreadyEnded: boolean;
    playState: PlayState;
    init(videoObject: any): void;
    changeStyle(attr: any): void;
    checkSlideState(slideState: any, oldState: any): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    play: () => void;
    ended: () => void;
    render(): JSX.Element;
}
export {};
