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
    componentWillLoad() {
        this.init(this.textObject);
    }
    componentDidLoad() { }
    render() {
        if (this.text) {
            const customContentContainerWidth = document.getElementsByClassName("custom-content-container")[0].clientWidth;
            const deviceWidth = window["device_window_size"].width;
            let previewerAdjustment = 1;
            if (deviceWidth != customContentContainerWidth) {
                console.log('here');
                previewerAdjustment = customContentContainerWidth / deviceWidth;
            }
            let translation = 0;
            if (this.textAlign === "right") {
                translation = (this.width * previewerAdjustment * this.scaleX) / 2;
            }
            const getTextYAttribute = function (baseText) {
                let adj = 0;
                const f = baseText.fontSize;
                if (baseText.fontFamily === 'Tahoma') {
                    console.log('tahoma');
                    adj = -.3;
                    if (f >= 21) {
                        adj += ((f - 20) / 10) * -.325;
                    }
                }
                else if (baseText.fontFamily === 'Impact') {
                    console.log('Impact');
                    adj = -.3;
                    if (f >= 21) {
                        adj += ((f - 20) / 10) * -.25;
                    }
                }
                else if (baseText.fontFamily === 'Georgia') {
                    console.log("GEORGIA");
                    adj = .2;
                    if (f >= 21) {
                        adj = .2 - ((f - 20) / 10) * .06;
                        console.log('adj', adj);
                    }
                }
                else if (baseText.fontFamily === 'Times New Roman') {
                    adj = .2;
                    if (f >= 21) {
                        adj = .2 + ((f - 20) / 10) * .085;
                    }
                }
                else if (baseText.fontFamily === 'Verdana') {
                    console.log('verdana');
                    if (f < 20) {
                        adj = -.2;
                    }
                    else if (f >= 21 && f <= 59) {
                        adj = -.8;
                    }
                    else {
                        adj = -.8 - ((f - 50) / 10) * .3;
                    }
                }
                else if (baseText.fontFamily === 'Galada') {
                    console.log('galada');
                    if (f < 25) {
                        adj = -.3;
                    }
                    else if (f > -25) {
                        adj = -.3 + ((f - 20) / 10) * -.3;
                    }
                }
                else if (baseText.fontFamily === 'Damion') {
                    console.log('damion');
                    if (f < 25) {
                        adj = -.3;
                    }
                    else if (f > -25) {
                        adj = -.3 + ((f - 20) / 10) * -.22;
                    }
                }
                else if (baseText.fontFamily === 'Permanent Marker') {
                    console.log('permanent');
                    if (f < 10) {
                        adj = 0;
                    }
                    else if (f < 30) {
                        adj = -.8;
                    }
                    else {
                        adj = -.8 + ((f - 30) / 10) * -.55;
                    }
                }
                else if (baseText.fontFamily === 'Courgette') {
                    adj = -.1;
                    if (f > 10) {
                        adj += (f / 10) * -.1;
                    }
                }
                else if (baseText.fontFamily === 'Baloo') {
                    adj = -.4;
                    if (f > 20) {
                        adj += ((f - 20) / 10) * -.45;
                    }
                }
                else if (baseText.fontFamily === 'Fredoka One') {
                    adj = -.2;
                    if (f > 20) {
                        adj += ((f - 20) / 10) * -.2;
                    }
                }
                else if (baseText.fontFamily === 'Comfortaa') {
                    adj = .3;
                    if (f > 30) {
                        adj = .5 + ((f - 30) / 10) * .1;
                    }
                }
                else if (baseText.fontFamily === 'Keania One') {
                    adj = .3;
                    if (f > 20) {
                        adj = -.4 + ((f - 20) / 10) * -.15;
                    }
                }
                console.log('FONT SIZE', baseText.fontSize, "---ADJ:", adj);
                return adj;
            };
            const xAdjustment = function (baseText) {
                const { fontSize, fontFamily } = baseText;
                if (fontFamily === 'Georgia') {
                    console.log('x geo');
                    if (fontSize <= 65) {
                        return .3;
                    }
                    else
                        return .4;
                }
                if (fontFamily === 'Times New Roman') {
                    return .3;
                }
                if (fontFamily === 'Verdana') {
                    return .2;
                }
                if (fontFamily === 'Galada') {
                    return .3;
                }
                if (fontFamily === 'Damion') {
                    if (fontSize > 55) {
                        return .2;
                    }
                    else
                        return 0;
                }
                if (fontFamily === 'Permanent Marker') {
                    if (fontSize < 70) {
                        return .1;
                    }
                    else
                        return .2;
                }
                if (fontFamily === 'Baloo') {
                    return .3;
                }
                if (fontFamily === 'Fredoka One') {
                    return .3;
                }
                if (fontFamily === 'Keania One') {
                    return .3;
                }
                return .2;
            };
            return (h("div", { class: "text-wrapper", style: getBaseTextStyle(this) },
                h("svg", null,
                    h("text", { x: "0", y: `${getTextYAttribute(this)}`, width: "100%", height: "100%", "dominant-baseline": "hanging", fill: this.fill, style: getSvgTextStyle(this), transform: `translate(${translation})` }, renderMultiline(this, previewerAdjustment, xAdjustment(this))))));
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
