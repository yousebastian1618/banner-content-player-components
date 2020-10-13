/**
 * Generates CSS for custom-content-container
 * @return {object}
 */
function getBackground(data, adjustment) {
    let bg = {};
    if (data.backgroundImage) {
        bg = {
            "background-image": `url(${data.backgroundImage.src})`,
            "background-size": "100% 100%",
            height: `${adjustment.height}`,
            width: `${adjustment.width}`,
        };
    }
    else {
        bg = {
            "background-color": `${data.background}`,
            height: `${adjustment.height}`,
            width: `${adjustment.width}`,
        };
    }
    return bg;
}
/**
 * Renders videos tags as <video-tag />
 * @param {object}
 * @return {HTMLStencilElement}
 */
function renderVideos({ content, containerWidth, containerHeight, slideState, }) {
    return (h("video-tag", { videoObject: content, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
}
/**
 * Renders text tags as <text-tag />
 * @param {object}
 * @return {HTMLStencilElement}
 */
function renderTexts({ content, containerWidth, containerHeight, slideState }) {
    return (h("text-tag", { textObject: content, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
}
/**
 * Renders clock tags as <clock-tag />
 * @param {object}
 */
function renderClocks({ content, containerWidth, containerHeight, slideState, }) {
    return (h("clock-tag", { clockObject: content, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
}
/**
 * Renders weather tags as <weather-tag />
 * @param {object}
 */
function renderWeathers({ content, containerWidth, containerHeight, slideState, }) {
    return (h("weather-tag", { weatherObject: content, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
}
/**
 * Renders images tags
 * @param {object}
 */
function renderImages({ content, containerHeight, containerWidth }) {
    return (h("img", { class: "custom-content-image", src: content.src, style: {
            top: `${(content.top / containerHeight) * 100}%`,
            left: `${(content.left / containerWidth) * 100}%`,
            height: `${((content.height * content.scaleY) / containerHeight) * 100}%`,
            "min-width": `${((content.width * content.scaleX) / containerWidth) * 100}%`,
            transform: `rotate(${content.angle}deg)`,
            "transform-origin": `${content.originX} ${content.originY}`,
            "z-index": `${content.zIndex}`,
        } }));
}
/**
 * Pairs content type to rendering function
 */
const render = {
    "i-text": renderTexts,
    image: renderImages,
    video: renderVideos,
    time: renderClocks,
    weather: renderWeathers,
};
export class CustomContentTag {
    render() {
        const content = [];
        this.data.objects.forEach((obj) => {
            const singleObj = {
                background: this.data.background,
                containerHeight: this.data.containerHeight,
                containerWidth: this.data.containerWidth,
                content: obj,
                slideState: this.data.slideState,
            };
            content.push(render[obj.type](singleObj));
        });
        return (h("div", { class: "custom-content-container", style: getBackground(this.data, this.adjustment) }, content));
    }
    static get is() { return "custom-content-tag"; }
    static get properties() { return {
        "adjustment": {
            "type": "Any",
            "attr": "adjustment"
        },
        "data": {
            "type": "Any",
            "attr": "data"
        }
    }; }
    static get style() { return "/**style-placeholder:custom-content-tag:**/"; }
}
