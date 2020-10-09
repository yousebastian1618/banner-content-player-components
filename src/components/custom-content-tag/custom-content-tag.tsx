import { Component, Prop } from "@stencil/core";

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
  } else {
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
function renderVideos({
  objects,
  containerWidth,
  containerHeight,
  slideState,
}) {
  console.log("RENDER VIDEOS", objects);

  // Returns only the objects that are videos
  let videos = objects.filter((obj) => {
    return obj.type === "video";
  });
  // Returns all the videos as video-tags components
  return videos.map((video) => {
    const adjustment = { width: video.width, height: video.height };
    return (
      <video-tag
        videoObject={video}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        slideState={slideState}
        adjustment={adjustment}
      />
    );
  });
}

/**
 * Renders text tags as <text-tag />
 * @param {object}
 * @return {HTMLStencilElement}
 */
function renderTexts({ objects, containerWidth, containerHeight, slideState }) {
  let texts = objects.filter((obj) => {
    return obj.type === "i-text";
  });
  texts = texts.map((t) => {
    return (
      <text-tag
        textObject={t}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        slideState={slideState}
      />
    );
  });
  return texts;
}

/**
 * Renders clock tags as <clock-tag />
 * @param {object}
 */
function renderClocks({
  objects,
  containerWidth,
  containerHeight,
  slideState,
}) {
  let clocks = objects.filter((obj) => {
    return obj.type === "time";
  });
  clocks = clocks.map((c) => {
    return (
      <clock-tag
        clockObject={c}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        slideState={slideState}
      />
    );
  });
  return clocks;
}

/**
 * Renders weather tags as <weather-tag />
 * @param {object}
 */
function renderWeathers({
  objects,
  containerWidth,
  containerHeight,
  slideState,
}) {
  let weathers = objects.filter((obj) => {
    return obj.type === "weather";
  });
  weathers = weathers.map((w) => {
    return (
      <weather-tag
        weatherObject={w}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        slideState={slideState}
      />
    );
  });
  return weathers;
}

/**
 * Renders images tags
 * @param {object}
 */
function renderImages({ objects }) {
  console.log("RENDER IMAGES");
  let images = objects.filter((obj) => {
    return obj.type === "image";
  });

  images = images.map((image) => {
    return (
      <div
        id="image-wrappper"
        style={{
          top: `${image.top}px`,
          left: `${image.left}px`,
          width: "100%",
          height: "100%",
          transform: `rotate(${image.angle}deg)`,
          "transform-origin": `${image.originX} ${image.originY}`,
          "z-index": `${image.zIndex}`,
        }}
      >
        <img class={"full-screen"} src={image.src} />
      </div>

      // <img
      //   class="custom-content-image"
      //   src={image.src}
      //   style={{
      //     top: `${image.top}px`,
      //     left: `${image.left}px`,
      //     // top: `${(image.top / containerHeight) * 100}%`,
      //     // left: `${(image.left / containerWidth) * 100}%`,
      //     // width: `${((image.width * image.scaleX) / containerWidth) * 100}%`,
      //     // height: `${((image.height * image.scaleY) / containerHeight) * 100}%`,
      //     width: adjustment.width,
      //     height: adjustment.height,
      //     transform: `rotate(${image.angle}deg)`,
      //     "transform-origin": `${image.originX} ${image.originY}`,
      //     "z-index": `${image.zIndex}`,
      //   }}
      // />
    );
  });
  return images;
}

@Component({
  tag: "custom-content-tag",
  styleUrl: "custom-content-tag.css",
})
export class CustomContentTag {
  @Prop() data: any;
  @Prop() adjustment: any;

  render() {
    console.log("custom content data", this.data);
    return (
      <div
        class="custom-content-container"
        style={getBackground(this.data, this.adjustment)}
      >
        {renderVideos(this.data)}
        {renderTexts(this.data)}
        {renderClocks(this.data)}
        {renderWeathers(this.data)}
        {renderImages(this.data)}
      </div>
    );
  }
}
