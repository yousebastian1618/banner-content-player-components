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
    /**
     * ContentSlideTag events
     *
     * Listens events:
     *  CONTENT_PLAYER_CHANGED
     *  HIDE_LAST_SLIDE
     *
     * Dispatches events:
     *  HIDE_LAST_SLIDE
     *
     */
    /**
     * Updates the contentSlideObject with the value of 'att'
     *
     * As 'init' is called in 'componentWillLoad', it's only executed one time
     */
    init(att: any): void;
    /**
     * Lifecycle method that is called once when the component is first
     * connected to the DOM.
     */
    componentWillLoad(): void;
    /**
     * Lifecycle method that is called just after the component updates.
     * It's never called during the first render()
     */
    componentDidUpdate(): void;
    /**
     * Lifecycle method that is called once when the component is fully loaded
     * and the first render() occurs.
     *
     * Adds event listeners for "CONTENT_PLAYER_CHANGED" and for "HIDE_LAST_SLIDE"
     */
    componentDidLoad(): void;
    /**
     * When the component is no unloaded, it removes the events listeners for "CONTENT_PLAYER_CHANGED"
     * and for "HIDE_LAST_SLIDE"
     */
    componentDidUnload(): void;
    hideLastSlide: (event: any) => void;
    contentChanged: (event: any) => void;
    /**
     * Gets animation for the content
     * @return {Promise}
     */
    getAnimation: () => any;
    render(): JSX.Element;
}
