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
function renderVideos({ object, containerWidth, containerHeight, slideState }) {
    // Returns only the objects that are videos
    // let videos = objects.filter((obj) => {
    //   return obj.type === "video";
    // });
    // console.log("VIDEOS", videos);
    // Returns all the videos as video-tags components
    // return videos.map((video) => {
    // const adjustment = { width: video.width, height: video.height };
    return (h("video-tag", { videoObject: object, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
    // });
}
/**
 * Renders text tags as <text-tag />
 * @param {object}
 * @return {HTMLStencilElement}
 */
function renderTexts({ object, containerWidth, containerHeight, slideState }) {
    // let texts = objects.filter((obj) => {
    //   return obj.type === "i-text";
    // });
    // texts = texts.map((t) => {
    return (h("text-tag", { textObject: object, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
    // });
    // return texts;
}
/**
 * Renders clock tags as <clock-tag />
 * @param {object}
 */
function renderClocks({ object, containerWidth, containerHeight, slideState }) {
    // let clocks = objects.filter((obj) => {
    //   return obj.type === "time";
    // });
    // clocks = clocks.map((c) => {
    return (h("clock-tag", { clockObject: object, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
    // });
    // return clocks;
}
/**
 * Renders weather tags as <weather-tag />
 * @param {object}
 */
function renderWeathers({ object, containerWidth, containerHeight, slideState, }) {
    // let weathers = objects.filter((obj) => {
    //   return obj.type === "weather";
    // });
    // weathers = weathers.map((w) => {
    return (h("weather-tag", { weatherObject: object, containerWidth: containerWidth, containerHeight: containerHeight, slideState: slideState }));
    // });
    // return weathers;
}
/**
 * Renders images tags
 * @param {object}
 */
function renderImages({ object, containerHeight, containerWidth }) {
    console.log("RENDER IMAGES");
    console.log("containerWidth", containerWidth);
    console.log("containerHeight", containerHeight);
    console.log("obj", object);
    // let images = objects.filter((obj) => {
    //   return obj.type === "image";
    // });
    // console.log("images", images);
    // images = images.map((image) => {
    return (
    // <div
    //   id="image-wrappper"
    //   style={{
    //     top: `${image.top}px`,
    //     left: `${image.left}px`,
    //     width: `(${image.width} * ${image.scaleX})px`,
    //     height: `(${image.height} * ${image.scaleY})px`,
    //     transform: `rotate(${image.angle}deg)`,
    //     "transform-origin": `${image.originX} ${image.originY}`,
    //     "z-index": `${image.zIndex}`,
    //   }}
    // >
    //   <img class={"full-screen"} src={image.src} />
    // </div>
    h("img", { class: "custom-content-image", src: object.src, style: {
            top: `${(object.top / containerHeight) * 100}%`,
            left: `${(object.left / containerWidth) * 100}%`,
            "min-height": `${((object.height * object.scaleY) / containerHeight) * 100}%`,
            "min-width": `${((object.width * object.scaleX) / containerWidth) * 100}%`,
            // width: `${((image.width * image.scaleX) / 200) * 100}px`,
            // height: `${((image.height * image.scaleY) / 300) * 100}px`,
            transform: `rotate(${object.angle}deg)`,
            "transform-origin": `${object.originX} ${object.originY}`,
            "z-index": `${object.zIndex}`,
        } }));
    // });
    // return images;
}
/**
 * Pairs content type to rendering function
 * @param {object}
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
        console.log("custom content data", this.data);
        const content = [];
        this.data.objects.forEach((obj) => {
            const singleObj = {
                background: this.data.background,
                containerHeight: this.data.containerHeight,
                containerWidth: this.data.containerWidth,
                object: obj,
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
