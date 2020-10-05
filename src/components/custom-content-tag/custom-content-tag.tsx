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
function renderVideos(
  { objects, containerWidth, containerHeight, slideState },
  adjustment
) {
  console.log("custom renderVideos");
  // Returns only the objects that are videos
  let videos = objects.filter((obj) => {
    return obj.type === "video";
  });
  console.log("videso length", videos.length);
  // Returns all the videos as video-tags components
  return videos.map((video) => {
    console.log("doing a video");
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
function renderImages({ objects, containerWidth, containerHeight }) {
  let images = objects.filter((obj) => {
    return obj.type === "image";
  });
  images = images.map((image) => {
    return (
      <img
        class="custom-content-image"
        src={image.src}
        style={{
          top: `${(image.top / containerHeight) * 100}%`,
          left: `${(image.left / containerWidth) * 100}%`,
          width: `${((image.width * image.scaleX) / containerWidth) * 100}%`,
          height: `${((image.height * image.scaleY) / containerHeight) * 100}%`,
          transform: `rotate(${image.angle}deg)`,
          "transform-origin": `${image.originX} ${image.originY}`,
          "z-index": `${image.zIndex}`,
        }}
      />
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
    return (
      <div
        class="custom-content-container"
        style={getBackground(this.data, this.adjustment)}
      >
        {renderVideos(this.data, this.adjustment)}
        {renderTexts(this.data)}
        {renderClocks(this.data)}
        {renderWeathers(this.data)}
        {renderImages(this.data)}
      </div>
    );
  }
}
