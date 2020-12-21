import velocity from "velocity-animate";
import SlideState from "../../common/slide-state";
function getDeviceDimensions() {
    let deviceDimensions = window["device_window_size"];
    return deviceDimensions;
}
function getPlayerDimensions() {
    let playerDimensions = window["player_window_size"];
    return playerDimensions;
}
function calculateWidthAdjustment(deviceWidth) {
    let playerDimensions = getPlayerDimensions();
    let windowWidthThreshold = playerDimensions.width;
    if (deviceWidth < windowWidthThreshold) {
        return (deviceWidth * 100) / windowWidthThreshold;
    }
    return 100;
}
function calculateHeightAdjustment(deviceHeight) {
    let playerDimensions = getPlayerDimensions();
    let windowHeightThreshold = playerDimensions.height;
    if (deviceHeight < windowHeightThreshold) {
        return (deviceHeight * 100) / windowHeightThreshold;
    }
    return 100;
}
function renderContentImage(content) {
    if (content.type === "image") {
        let deviceDimensions = getDeviceDimensions();
        let width = calculateWidthAdjustment(deviceDimensions.width);
        let height = calculateHeightAdjustment(deviceDimensions.height);
        let adjustment = {
            width: `${width}%`,
            height: `${height}%`,
        };
        return (h("div", { id: "image-wrappper", style: adjustment },
            h("img", { class: "full-screen", src: content.url })));
    }
    return null;
}
function renderContentVideo(content, slideState) {
    if (content.type === "video") {
        let deviceDimensions = getDeviceDimensions();
        let width = calculateWidthAdjustment(deviceDimensions.width);
        let height = calculateHeightAdjustment(deviceDimensions.height);
        let adjustment = {
            width: `${width}%`,
            height: `${height}%`,
        };
        let video = {
            src: content.url,
            top: 0,
            left: 0,
            width: content.width,
            height: content.height,
            containerWidth: content.width,
            containerHeight: content.height,
            zIndex: 1,
            slideState: slideState,
        };
        return (h("video-tag", { class: "full-screen", videoObject: video, adjustment: adjustment }));
    }
    return null;
}
function renderCustomContent(content, slideState) {
    if (content.type === "customContent") {
        let deviceDimensions = getDeviceDimensions();
        let width = calculateWidthAdjustment(deviceDimensions.width);
        let height = calculateHeightAdjustment(deviceDimensions.height);
        let adjustment = {
            width: `${width}%`,
            height: `${height}%`,
        };
        let data = Object.assign({}, content.__data__, {
            containerWidth: content.width,
            containerHeight: content.height,
            slideState: slideState,
        });
        return (h("custom-content-tag", { class: "full-screen", data: data, adjustment: adjustment }));
    }
    return null;
}
export class ContentSlideTag {
    constructor() {
        this.animationPromise = undefined;
        this.hideLastSlide = (event) => {
            let { currentIndex } = event.detail;
            if (this.content.index !== currentIndex &&
                this.status !== SlideState.HIDE) {
                this.status = SlideState.HIDE;
            }
        };
        this.contentChanged = (event) => {
            if (!event.detail) {
                this.status = SlideState.HIDE;
                this.lastContentId = undefined;
                this.content = null;
            }
            else {
                let { content } = event.detail;
                if (content === undefined) {
                    this.status = SlideState.HIDE;
                    this.lastContentId = undefined;
                    return;
                }
                if (content.id === this.content.id) {
                    this.el.style.zIndex = "2";
                    this.status = SlideState.START_ANIMATION;
                }
                else if (this.content.id === this.lastContentId) {
                    this.el.style.zIndex = "1";
                }
                else {
                    this.el.style.zIndex = "0";
                    this.status = SlideState.HIDE;
                }
                this.lastContentId = content.id;
            }
        };
        this.getAnimation = () => {
            let container = this.el.querySelector(".content-slide-wrapper");
            switch (this.content.animation) {
                case "slideUp":
                    return velocity(container, { translateY: "100%", opacity: 1 }, { duration: 0 }).then(() => {
                        return velocity(container, { translateY: "0%" }, { duration: 2 * 1000 });
                    });
                case "slideDown":
                    return velocity(container, { translateY: "-100%", opacity: 1 }, { duration: 0 }).then(() => {
                        return velocity(container, { translateY: "0%" }, { duration: 2 * 1000 });
                    });
                case "slideRight":
                    return velocity(container, { translateX: "-100%", opacity: 1 }, { duration: 0 }).then(() => {
                        return velocity(container, { translateX: "0%" }, { duration: 2 * 1000 });
                    });
                case "slideLeft":
                    return velocity(container, { translateX: "100%", opacity: 1 }, { duration: 0 }).then(() => {
                        return velocity(container, { translateX: "0%" }, { duration: 2 * 1000 });
                    });
                case "fade":
                    return velocity(container, { opacity: 0 }, { duration: 0 }).then(() => {
                        return velocity(container, { opacity: 1 }, { duration: 2 * 1000 });
                    });
                default:
                    return velocity(container, { opacity: 1 }, { duration: 1 });
            }
        };
    }
    init(att) {
        Object.assign(this, Object.assign({}, att));
    }
    componentWillLoad() {
        this.init(this.contentSlideObject);
    }
    componentDidUpdate() {
        (function (status) {
            console.log([
                "INIT",
                "WAIT_ANIMATION",
                "START_ANIMATION",
                "SHOW",
                "TRANSITION",
                "HIDE",
            ][status]);
        })(this.status);
        let ele = this.el.querySelector(".content-slide-wrapper");
        switch (this.status) {
            case SlideState.INIT:
                if (ele) {
                    ele.setAttribute("style", "opacity: 0");
                }
                this.status = SlideState.WAIT_ANIMATION;
                break;
            case SlideState.START_ANIMATION:
                this.getAnimation().then(() => {
                    this.status = SlideState.SHOW;
                });
                break;
            case SlideState.SHOW:
                let hideOthers = new CustomEvent("HIDE_LAST_SLIDE", {
                    detail: { currentIndex: this.content.index },
                });
                window.dispatchEvent(hideOthers);
                break;
            case SlideState.HIDE:
                if (ele) {
                    ele.setAttribute("style", "opacity: 0");
                }
                break;
        }
    }
    componentDidLoad() {
        this.status = SlideState.INIT;
        window.addEventListener("CONTENT_PLAYER_CHANGED", this.contentChanged);
        window.addEventListener("HIDE_LAST_SLIDE", this.hideLastSlide);
    }
    componentDidUnload() {
        window.removeEventListener("CONTENT_PLAYER_CHANGED", this.contentChanged);
        window.removeEventListener("HIDE_LAST_SLIDE", this.hideLastSlide);
    }
    render() {
        return (h("div", { class: "content-slide-wrapper", style: { opacity: `${this.opacity}` } },
            this.content ? renderContentImage(this.content) : null,
            this.content ? renderContentVideo(this.content, this.status) : null,
            this.content ? renderCustomContent(this.content, this.status) : null));
    }
    static get is() { return "content-slide-tag"; }
    static get properties() { return {
        "animationEnd": {
            "type": Boolean,
            "attr": "animation-end",
            "mutable": true
        },
        "content": {
            "type": "Any",
            "attr": "content",
            "mutable": true
        },
        "contentSlideObject": {
            "type": "Any",
            "attr": "content-slide-object",
            "watchCallbacks": ["init"]
        },
        "el": {
            "elementRef": true
        },
        "opacity": {
            "type": Number,
            "attr": "opacity",
            "mutable": true
        },
        "status": {
            "state": true
        },
        "visible": {
            "type": Boolean,
            "attr": "visible",
            "mutable": true
        }
    }; }
    static get style() { return "/**style-placeholder:content-slide-tag:**/"; }
}
