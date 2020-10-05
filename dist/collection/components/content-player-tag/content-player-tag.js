export class ContentPlayerTag {
    constructor() {
        this.slides = [];
        this.loadContents = (event) => {
            this.el.style.opacity = "0";
            this.slides = event.detail;
        };
        this.playNextContent = () => {
            this.el.style.opacity = "1";
        };
    }
    componentDidLoad() {
        window.addEventListener("CONTENT_PLAYER_LOAD", this.loadContents);
        window.addEventListener("CONTENT_PLAYER_CHANGED", this.playNextContent);
    }
    componentDidUnload() {
        window.removeEventListener("CONTENT_PLAYER_LOAD", this.loadContents);
        window.removeEventListener("CONTENT_PLAYER_CHANGED", this.playNextContent);
        let closeEvent = new Event("CONTENT_PLAYER_CLOSE");
        window.dispatchEvent(closeEvent);
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
