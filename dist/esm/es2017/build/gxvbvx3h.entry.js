import { h } from '../contentplayer.core.js';

import { a as SlideState } from './chunk-1fc3cad0.js';

var PlayState;
(function (PlayState) {
    PlayState[PlayState["STOP"] = 0] = "STOP";
    PlayState[PlayState["PLAYING"] = 1] = "PLAYING";
})(PlayState || (PlayState = {}));
class VideoTag {
    constructor() {
        this.videoObject = {
            top: 100,
            left: 0,
            width: 100,
            height: 100,
            zIndex: 1,
            src: "http://media.w3.org/2010/05/sintel/trailer.webm",
        };
        this.originX = "top";
        this.originY = "left";
        this.angle = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.alreadyEnded = true;
        this.playState = PlayState.STOP;
        this.play = () => {
            let ele = this.el.querySelector("video");
            if (ele && this.playState === PlayState.STOP) {
                this.playState = PlayState.PLAYING;
                ele.addEventListener("ended", this.ended);
                ele.play();
            }
        };
        this.ended = () => {
            let ele = this.el.querySelector("video");
            if (this.playState === PlayState.PLAYING) {
                this.playState = PlayState.STOP;
                ele.removeEventListener("ended", this.ended);
                let videoEnded = new Event("VIDEO_CONTENT_ENDED");
                window.dispatchEvent(videoEnded);
            }
        };
    }
    init(attr) {
        try {
            Object.assign(this, Object.assign({}, attr));
        }
        catch (err) {
            console.log(err.message);
        }
    }
    changeStyle(attr) {
        try {
            Object.assign(this, Object.assign({}, attr));
        }
        catch (err) {
            console.log(err.message);
        }
    }
    checkSlideState(slideState, oldState) {
        if (oldState === SlideState.SHOW &&
            slideState === SlideState.START_ANIMATION) {
            this.el.querySelector("video").currentTime = 0;
            this.play();
        }
        if (oldState !== slideState) {
            switch (slideState) {
                case SlideState.SHOW:
                    this.play();
                    break;
                case SlideState.HIDE:
                    this.playState = PlayState.STOP;
                    this.el.querySelector("video").currentTime = 0;
                    this.el
                        .querySelector("video")
                        .removeEventListener("ended", this.ended);
                    break;
            }
        }
    }
    componentWillLoad() {
        this.init(this.videoObject);
        this.changeStyle(this.adjustment);
    }
    componentDidLoad() { }
    componentDidUpdate() { }
    render() {
        if (this.src) {
            let style = {
                top: `${(this.top / this.containerHeight) * 100}%`,
                left: `${(this.left / this.containerWidth) * 100}%`,
                width: this.adjustment.width,
                height: this.adjustment.height,
                transform: `rotate(${this.angle}deg)`,
                "transform-origin": `${this.originX} ${this.originY}`,
                zIndex: `${this.zIndex}`,
            };
            return (h("div", { class: "video-wrapper", style: style },
                h("div", { class: "video-helper" },
                    h("video", { src: this.src, autoplay: this.autoplay, loop: this.loop, muted: true }))));
        }
        else
            return null;
    }
    static get is() { return "video-tag"; }
    static get properties() { return {
        "adjustment": {
            "type": "Any",
            "attr": "adjustment",
            "watchCallbacks": ["changeStyle"]
        },
        "angle": {
            "type": Number,
            "attr": "angle",
            "mutable": true
        },
        "autoplay": {
            "type": Boolean,
            "attr": "autoplay",
            "mutable": true
        },
        "containerHeight": {
            "type": Number,
            "attr": "container-height",
            "mutable": true
        },
        "containerWidth": {
            "type": Number,
            "attr": "container-width",
            "mutable": true
        },
        "el": {
            "elementRef": true
        },
        "height": {
            "type": Number,
            "attr": "height",
            "mutable": true
        },
        "left": {
            "type": Number,
            "attr": "left",
            "mutable": true
        },
        "loop": {
            "type": Boolean,
            "attr": "loop",
            "mutable": true
        },
        "originX": {
            "type": String,
            "attr": "origin-x",
            "mutable": true
        },
        "originY": {
            "type": String,
            "attr": "origin-y",
            "mutable": true
        },
        "scaleX": {
            "type": Number,
            "attr": "scale-x",
            "mutable": true
        },
        "scaleY": {
            "type": Number,
            "attr": "scale-y",
            "mutable": true
        },
        "slideState": {
            "type": Number,
            "attr": "slide-state",
            "mutable": true,
            "watchCallbacks": ["checkSlideState"]
        },
        "src": {
            "type": String,
            "attr": "src",
            "mutable": true
        },
        "top": {
            "type": Number,
            "attr": "top",
            "mutable": true
        },
        "videoObject": {
            "type": "Any",
            "attr": "video-object",
            "watchCallbacks": ["init"]
        },
        "width": {
            "type": Number,
            "attr": "width",
            "mutable": true
        },
        "zIndex": {
            "type": Number,
            "attr": "z-index",
            "mutable": true
        }
    }; }
    static get style() { return "video-tag div.video-wrapper{display:block;position:absolute;background-color:#1e1e1e}video-tag div.video-wrapper .video-helper{position:relative;height:100%;padding-left:100%}video-tag .video-helper video{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:fill;object-fit:fill}"; }
}

export { VideoTag };
