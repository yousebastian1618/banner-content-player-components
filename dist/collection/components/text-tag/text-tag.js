import { getBaseTextStyle, getSvgTextStyle, } from "../../common/get-base-text-style";
import checkSlideState from "../../common/text-behaviour";
import renderMultiline from "../../common/text-multiline";
export class TextTag {
    constructor() {
        this.fill = "red";
        this.fontSize = 12;
        this.angle = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.fontWeight = "normal";
        this.fontFamily = "Arial";
        this.textAlign = "center";
        this.fontStyle = "normal";
        this.stroke = "";
        this.strokeWidth = 0;
        this.zIndex = 1;
        this.text = "";
    }
    /**
     * Updates the 'textObject' prop with the value of attr.
     *
     * As 'init' is called in 'componentWillLoad', it's only executed one time
     * @param {any} attr
     */
    init(attr) {
        try {
            Object.assign(this, Object.assign({}, attr));
        }
        catch (err) {
            console.log(err.message);
        }
    }
    checkSlideState(slideState) {
        let ele = this.el.querySelector(".text-wrapper");
        checkSlideState(slideState, ele, this, this.textObject);
    }
    /**
     * Lifecycle method that is called once when the component is first
     * connected to the DOM.
     */
    componentWillLoad() {
        this.init(this.textObject);
    }
    /**
     * Lifecycle method that is called once when the component is fully loaded
     * and the first render() occurs.
     */
    componentDidLoad() { }
    render() {
        if (this.text) {
            const contentPlayerWidth = document.getElementsByClassName("content-player-wrapper")[0].clientWidth;
            const deviceWidth = window["device_window_size"].width;
            let previewerAdjustment = 1;
            if (deviceWidth != contentPlayerWidth) {
                previewerAdjustment = contentPlayerWidth / deviceWidth;
            }
            let translation = 0;
            if (this.textAlign === "right") {
                translation = (this.width * previewerAdjustment * this.scaleX) / 2;
            }
            return (h("div", { class: "text-wrapper", style: getBaseTextStyle(this) },
                h("svg", null,
                    h("text", { x: "0", y: "0", width: "100%", height: "100%", "dominant-baseline": "hanging", fill: this.fill, style: getSvgTextStyle(this), transform: `translate(${translation})` }, renderMultiline(this, previewerAdjustment)))));
        }
    }
    static get is() { return "text-tag"; }
    static get properties() { return {
        "angle": {
            "type": Number,
            "attr": "angle",
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
        "text": {
            "type": String,
            "attr": "text",
            "mutable": true
        },
        "textAlign": {
            "type": String,
            "attr": "text-align",
            "mutable": true
        },
        "textObject": {
            "type": "Any",
            "attr": "text-object",
            "watchCallbacks": ["init"]
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
    static get style() { return "/**style-placeholder:text-tag:**/"; }
}
