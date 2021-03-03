import moment from "moment";
import { getBaseTextStyle } from "../../common/get-base-text-style";
import checkSlideState from "../../common/text-behaviour";
import { getYAdjustment } from "../../common/get-weather-time-text-y-attribute";
let clockInterval;
let clockObservers;
const clockHandler = {
    init() {
        if (!clockObservers) {
            clockObservers = [];
        }
    },
    subscribe(observer) {
        let index = clockObservers.indexOf(observer);
        if (index === -1) {
            clockObservers.push(observer);
            observer.time = moment();
        }
        if (!clockInterval) {
            clockInterval = setInterval(() => {
                let time = moment();
                clockObservers.forEach((observer) => {
                    observer.time = time;
                });
            }, 1000);
        }
    },
    unsubscribe(observer) {
        let index = clockObservers.indexOf(observer);
        if (index >= 0) {
            clockObservers.splice(index, 1);
        }
        if (clockObservers.length === 0) {
            clearInterval(clockInterval);
        }
    },
};
export class ClockTag {
    constructor() {
        this.customMask = "HH:mm:ss";
    }
    init(attr) {
        try {
            Object.assign(this, Object.assign({}, attr), { customMask: attr.customData.mask });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    checkSlideState(slideState) {
        let ele = this.el.querySelector(".text-wrapper");
        checkSlideState(slideState, ele, this, this.clockObject);
    }
    componentWillLoad() {
        clockHandler.init();
        this.init(this.clockObject);
    }
    componentDidLoad() {
        clockHandler.subscribe(this);
    }
    render() {
        let time = "";
        if (this.time) {
            time = this.time.format(this.customMask);
        }
        const svgStyle = {
            'text-anchor': 'middle',
            transform: 'translate(50%, 0%)'
        };
        return (h("div", { class: "text-wrapper", style: getBaseTextStyle(this) },
            h("svg", { viewBox: `0 0 ${this.width * this.scaleX} ${this.height * this.scaleY}`, style: svgStyle },
                h("text", { x: "0", y: getYAdjustment(this), width: "100%", height: "100%", "dominant-baseline": "hanging", fill: this.fill, transform: `scale(${this.scaleX},${this.scaleY})` }, time))));
    }
    static get is() { return "clock-tag"; }
    static get properties() { return {
        "angle": {
            "type": Number,
            "attr": "angle",
            "mutable": true
        },
        "clockObject": {
            "type": "Any",
            "attr": "clock-object",
            "watchCallbacks": ["init"]
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
        "customMask": {
            "type": String,
            "attr": "custom-mask",
            "mutable": true
        },
        "el": {
            "elementRef": true
        },
        "fill": {
            "type": String,
            "attr": "fill",
            "mutable": true
        },
        "fontFamily": {
            "type": String,
            "attr": "font-family",
            "mutable": true
        },
        "fontSize": {
            "type": Number,
            "attr": "font-size",
            "mutable": true
        },
        "fontStyle": {
            "type": String,
            "attr": "font-style",
            "mutable": true
        },
        "fontWeight": {
            "type": String,
            "attr": "font-weight",
            "mutable": true
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
        "lineHeight": {
            "type": Number,
            "attr": "line-height",
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
        "stroke": {
            "type": String,
            "attr": "stroke",
            "mutable": true
        },
        "strokeLineCap": {
            "type": String,
            "attr": "stroke-line-cap",
            "mutable": true
        },
        "strokeLineJoin": {
            "type": String,
            "attr": "stroke-line-join",
            "mutable": true
        },
        "strokeWidth": {
            "type": Number,
            "attr": "stroke-width",
            "mutable": true
        },
        "textAlign": {
            "type": String,
            "attr": "text-align",
            "mutable": true
        },
        "time": {
            "state": true
        },
        "top": {
            "type": Number,
            "attr": "top",
            "mutable": true
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
    static get style() { return "/**style-placeholder:clock-tag:**/"; }
}
