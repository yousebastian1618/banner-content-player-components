import '../../stencil.core';
/**
 * STOP: 0
 * PLAYING: 1
 */
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
    /**
     * VideoTag events
     *
     * Listens events:
     *  ended
     *
     * Dispatches events:
     *  VIDEO_CONTENT_ENDED
     */
    /**
     * Updates the 'videoObject' prop with the value of any.
     *
     * As 'init' is called in 'componentWillLoad', it's only executed one time
     * @param {any} videoObject
     */
    init(videoObject: any): void;
    /**
     * Styling hot fix for video-wrapper div
     */
    /**
     * Whenever 'slideState' changes, it runs 'checkSlideState'
     * @param slideState
     * @param oldState
     */
    checkSlideState(slideState: any, oldState: any): void;
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
    /**
     * Lifecycle method that is called ojust after the component updates. It's never
     * called during the first render
     */
    componentDidUpdate(): void;
    /**
     * Changes 'playState' from 'STOP' to 'PLAYING'
     * and   playing the content.
     *
     * Adds an event listener for "ended" and passes function 'ended' as Callback
     * @return {undefined}
     */
    play: () => void;
    /**
     * Changes 'playState' from 'PLAYING' to 'STOP'
     * and stops playing the content
     *
     * Removes "ended" event listener and dispatches "VIDEO_CONTENT_ENDED"
     * for the Content Player
     */
    ended: () => void;
    render(): JSX.Element;
}
export {};
