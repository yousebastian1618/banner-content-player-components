export class ContentPlayerTag {
    constructor() {
        this.slides = [];
        /**
         * Loads contents into the array of slides. Each content represents a slide
         * Starts showing the current content
         * @param {any} event
         * @return {undefined}
         */
        this.loadContents = (event) => {
            this.el.style.opacity = "0";
            this.slides = event.detail;
        };
        /**
         * Stops showing current content to play the next one
         * @return {undefined}
         */
        this.playNextContent = () => {
            this.el.style.opacity = "1";
        };
    }
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
    componentDidLoad() {
        console.log("contentplayertag did load");
        window.addEventListener("CONTENT_PLAYER_LOAD", this.loadContents);
        window.addEventListener("CONTENT_PLAYER_CHANGED", this.playNextContent);
    }
    /**
     * Removes event listeners for "CONTENT_PLAYER_LOAD" and for "CONTENT_PLAYER_CHANGED"
     */
    componentDidUnload() {
        console.log("contentplayertag did unload");
        window.removeEventListener("CONTENT_PLAYER_LOAD", this.loadContents);
        window.removeEventListener("CONTENT_PLAYER_CHANGED", this.playNextContent);
        let closeEvent = new Event("CONTENT_PLAYER_CLOSE");
        window.dispatchEvent(closeEvent);
        console.log(this.slides);
    }
    render() {
        return (h("div", { class: "content-player-wrapper" }, this.slides.map((slideObject) => {
            return (h("content-slide-tag", { contentSlideObject: slideObject }));
        })));
    }
    static get is() { return "content-player-tag"; }
    static get properties() { return {
        "currentContentId": {
            "type": String,
            "attr": "current-content-id",
            "mutable": true
        },
        "el": {
            "elementRef": true
        },
        "slides": {
            "type": "Any",
            "attr": "slides",
            "mutable": true
        }
    }; }
    static get style() { return "/**style-placeholder:content-player-tag:**/"; }
}
