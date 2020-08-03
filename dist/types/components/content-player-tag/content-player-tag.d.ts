import '../../stencil.core';
export declare class ContentPlayerTag {
    el: HTMLStencilElement;
    slides: any;
    currentContentId: string;
    /**
     * ContentPlayerTag events
     *
     * Listens events:
     *  CONTENT_PLAYER_LOAD
     *  CONTENT_PLAYER_CHANGED
     *
     * Dispatches events:
     *  CONTENT_PLAYER_CLOSE
     */
    /**
     * Lifecycle method that is called once when the component is fully loaded
     * and the first render() occurs.
     *
     * Adds event listeners for "CONTENT_PLAYER_CHANGED" and for "CONTENT_PLAYER_LOAD"
     */
    componentDidLoad(): void;
    /**
     * Removes event listeners for "CONTENT_PLAYER_LOAD" and for "CONTENT_PLAYER_CHANGED"
     */
    componentDidUnload(): void;
    /**
     * Loads contents into the array of slides. Each content represents a slide
     * Starts showing the current content
     * @param {any} event
     * @return {undefined}
     */
    loadContents: (event: any) => void;
    /**
     * Stops showing current content to play the next one
     * @return {undefined}
     */
    playNextContent: () => void;
    render(): JSX.Element;
}
