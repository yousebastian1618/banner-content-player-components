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
function renderVideos({ content, containerWidth, containerHeight, slideState, }) {
    return (h("video-tag", { videoObject: content, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
}
function renderTexts({ content, containerWidth, containerHeight, slideState }) {
    return (h("text-tag", { textObject: content, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
}
function renderClocks({ content, containerWidth, containerHeight, slideState, }) {
    return (h("clock-tag", { clockObject: content, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
}
function renderWeathers({ content, containerWidth, containerHeight, slideState, }) {
    return (h("weather-tag", { weatherObject: content, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
}
function renderImages({ content, containerHeight, containerWidth, backgroundStyle, }) {
    const bStyleWidthDecimal = backgroundStyle.width.slice(0, -1) / 100;
    const bStyleHeightDecimal = backgroundStyle.height.slice(0, -1) / 100;
    const contentPlayerHTML = document.getElementById("content-player");
    const customContentContainerWidth = contentPlayerHTML.clientWidth * bStyleWidthDecimal;
    const customContentContainerHeight = contentPlayerHTML.clientHeight * bStyleHeightDecimal;
    let adjustedImageWidth, adjustedImageHeight;
    if (customContentContainerWidth !== containerWidth ||
        customContentContainerHeight !== containerHeight) {
        const previewerScaleX = (customContentContainerWidth / containerWidth) * content.scaleX;
        const previewerScaleY = (customContentContainerHeight / containerHeight) * content.scaleY;
        adjustedImageHeight = `${content.height * previewerScaleY}px`;
        adjustedImageWidth = `${content.width * previewerScaleX}px`;
    }
    else {
        adjustedImageHeight = `${content.height * content.scaleY}px`;
        adjustedImageWidth = `${content.width * content.scaleX}px`;
    }
    return (h("img", { class: "custom-content-image", src: content.src, style: {
            top: `${(content.top / containerHeight) * 100}%`,
            left: `${(content.left / containerWidth) * 100}%`,
            height: adjustedImageHeight,
            "min-width": adjustedImageWidth,
            "max-width": adjustedImageWidth,
            transform: `rotate(${content.angle}deg)`,
            "transform-origin": `${content.originX} ${content.originY}`,
        } }));
}
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
        const backgroundStyle = getBackground(this.data, this.adjustment);
        this.data.objects.forEach((obj) => {
            const singleObj = {
                background: this.data.background,
                containerHeight: this.data.containerHeight,
                containerWidth: this.data.containerWidth,
                content: obj,
                slideState: this.data.slideState,
                backgroundStyle: null,
            };
            if (obj.type === "image") {
                singleObj.backgroundStyle = backgroundStyle;
            }
            content.push(render[obj.type](singleObj));
        });
        return (h("div", { class: "custom-content-container", style: backgroundStyle }, content));
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
