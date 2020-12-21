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
  content,
  containerWidth,
  containerHeight,
  slideState,
}) {
  return (
    <video-tag
      videoObject={content}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      slideState={slideState}
    />
  );
}

/**
 * Renders text tags as <text-tag />
 * @param {object}
 * @return {HTMLStencilElement}
 */
function renderTexts({ content, containerWidth, containerHeight, slideState }) {
  return (
    <text-tag
      textObject={content}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      slideState={slideState}
    />
  );
}

/**
 * Renders clock tags as <clock-tag />
 * @param {object}
 */
function renderClocks({
  content,
  containerWidth,
  containerHeight,
  slideState,
}) {
  return (
    <clock-tag
      clockObject={content}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      slideState={slideState}
    />
  );
}

/**
 * Renders weather tags as <weather-tag />
 * @param {object}
 */
function renderWeathers({
  content,
  containerWidth,
  containerHeight,
  slideState,
}) {
  return (
    <weather-tag
      weatherObject={content}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      slideState={slideState}
    />
  );
}

/**
 * Renders images tags
 * @param {object}
 */
function renderImages({ content, containerHeight, containerWidth }) {
  // containerWidth and containerHeight are the dimensions of the LED Player

  // contentPlayerHTML is what banner-content-player-components inserts into the LED Player and/or the Playlist Previewer
  // Capturing it's dimensions and comparing it to the containerWidth/Height is how we determine which context the banner-content-player-components is being loaded into
  const contentPlayerHTML = document.getElementById("content-player");
  const contentPlayerHTMLWidth = contentPlayerHTML.clientWidth;
  const contentPlayerHTMLHeight = contentPlayerHTML.clientHeight;

  // Adjustment is for scaling image's original w and h to scale to either the Player or Playlist Previewer contexts
  let adjustedImageWidth, adjustedImageHeight;

  if (
    contentPlayerHTMLWidth !== containerWidth ||
    contentPlayerHTMLHeight !== containerHeight
  ) {
    // Playlist Previewer Context

    const previewerScaleX =
      (contentPlayerHTMLWidth / containerWidth) * content.scaleX;

    const previewerScaleY =
      (contentPlayerHTMLHeight / containerHeight) * content.scaleY;

    adjustedImageHeight = `${content.height * previewerScaleY}px`;
    adjustedImageWidth = `${content.width * previewerScaleX}px`;
  } else {
    // LED Player context
    adjustedImageHeight = `${content.height * content.scaleY}px`;
    adjustedImageWidth = `${content.width * content.scaleX}px`;
  }

  return (
    <img
      class="custom-content-image"
      src={content.src}
      style={{
        top: `${(content.top / containerHeight) * 100}%`,
        left: `${(content.left / containerWidth) * 100}%`,
        height: adjustedImageHeight,
        "min-width": adjustedImageWidth,
        "max-width": adjustedImageWidth,
        transform: `rotate(${content.angle}deg)`,
        "transform-origin": `${content.originX} ${content.originY}`,
      }}
    />
  );
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

@Component({
  tag: "custom-content-tag",
  styleUrl: "custom-content-tag.css",
})
export class CustomContentTag {
  @Prop() data: any;
  @Prop() adjustment: any;

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

    return (
      <div
        class="custom-content-container"
        style={getBackground(this.data, this.adjustment)}
      >
        {content}
      </div>
    );
  }
}
