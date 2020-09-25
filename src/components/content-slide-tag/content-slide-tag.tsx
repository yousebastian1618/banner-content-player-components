import { Component, Element, Prop, Watch, State } from "@stencil/core";
import velocity from "velocity-animate";
import SlideState from "../../common/slide-state";
// import { duration } from "moment";

/**
 * Gets device size dimensions
 * @return {object} deviceDimensions
 */
function getDeviceDimensions() {
  let deviceDimensions = window["device_window_size"];
  return deviceDimensions;
}

/**
 * Gets player size dimensions
 * @return {object} playerDimensions
 */
function getPlayerDimensions() {
  let playerDimensions = window["player_window_size"];
  return playerDimensions;
}

/**
 * Calculates the width attribute size in percentage for the content
 * @param {number} width
 * @return {number} Percetage for the width attribute
 */
function calculateWidthAdjustment(width) {
  let playerDimensions = getPlayerDimensions();
  let windowWidthThreshold = playerDimensions.width;

  if (width < windowWidthThreshold) {
    return (width * 100) / windowWidthThreshold;
  }
  return 100;
}

/**
 * Calculates the height attibute size in percentage for the content
 * @param {number} height
 * @return {number} Percetage for the height attribute
 */
function calculateHeightAdjustment(height) {
  let playerDimensions = getPlayerDimensions();
  let windowHeightThreshold = playerDimensions.height;

  if (height < windowHeightThreshold) {
    return (height * 100) / windowHeightThreshold;
  }
  return 100;
}

/**
 * Renders a simple image tag to represent the content
 * @prop {any} content
 * @return {HTMLElement | null}
 */
function renderContentImage(content) {
  let deviceDimensions = getDeviceDimensions();

  let width = calculateWidthAdjustment(deviceDimensions.width);
  let height = calculateHeightAdjustment(deviceDimensions.height);
  let adjustment = {
    width: `${width}%`,
    height: `${height}%`,
  };

  if (content.type === "image") {
    console.log("render image");
    return (
      <div id="image-wrappper" style={adjustment}>
        <img class={"full-screen"} src={content.url} />
      </div>
    );
  }
  return null;
}

/**
 * Renders the <video-tag /> to represent the content
 * @prop {any} content
 * @prop {SlideState} slideState
 * @return {HTMLElement | null}
 */
function renderContentVideo(content, slideState) {
  let deviceDimensions = getDeviceDimensions();

  let width = calculateWidthAdjustment(deviceDimensions.width);
  let height = calculateHeightAdjustment(deviceDimensions.height);
  let adjustment = {
    width: `${width}%`,
    height: `${height}%`,
  };
  if (content.type === "video") {
    console.log("render video");
    // This is passed down to the video-tag as a videoObject prop
    let video = {
      src: content.url,
      top: 0,
      left: 0,
      width: content.width,
      height: content.height,
      containerWidth: content.width,
      containerHeight: content.height,
      zIndex: 1,
      slideState: slideState,
    };
    return (
      <video-tag
        class={"full-screen"}
        videoObject={video}
        adjustment={adjustment}
      />
    );
  }
  return null;
}

/**
 * Renders the <custom-content-tag /> to represent custom content
 * created by the user
 * @prop {any} content
 * @prop {SlideState} slideState
 * @return {HTMLStencilElement | null}
 */
function renderCustomContent(content, slideState) {
  let deviceDimensions = getDeviceDimensions();

  let width = calculateWidthAdjustment(deviceDimensions.width);
  let height = calculateHeightAdjustment(deviceDimensions.height);
  let adjustment = {
    width: `${width}%`,
    height: `${height}%`,
  };

  if (content.type === "customContent") {
    console.log("render custom");
    console.log("adjust", adjustment);
    // This is passed down to the custom-content-tag as a data prop
    let data = Object.assign({}, content.__data__, {
      containerWidth: content.width,
      containerHeight: content.height,
      slideState: slideState,
    });
    return (
      <custom-content-tag
        class={"full-screen"}
        data={data}
        adjustment={adjustment}
      />
    );
  }
  return null;
}

@Component({
  tag: "content-slide-tag",
  styleUrl: "content-slide-tag.css",
  shadow: false,
})
export class ContentSlideTag {
  @Element() el: HTMLStencilElement;
  @Prop({ mutable: false }) contentSlideObject: any;
  @Prop({ mutable: true }) content: any;
  @Prop({ mutable: true }) visible: boolean;
  @Prop({ mutable: true }) opacity: number;
  @Prop({ mutable: true }) animationEnd: boolean;
  @State() status: SlideState;
  animationPromise: any = undefined;
  lastContentId: string;

  /**
   * ContentSlideTag events
   *
   * Listens events:
   *  CONTENT_PLAYER_CHANGED
   *  HIDE_LAST_SLIDE
   *
   * Dispatches events:
   *  HIDE_LAST_SLIDE
   *
   */

  /**
   * Updates the contentSlideObject with the value of 'att'
   *
   * As 'init' is called in 'componentWillLoad', it's only executed one time
   */
  @Watch("contentSlideObject")
  init(att) {
    Object.assign(this, { ...att });
  }

  /**
   * Lifecycle method that is called once when the component is first
   * connected to the DOM.
   */
  componentWillLoad() {
    this.init(this.contentSlideObject);
  }

  /**
   * Lifecycle method that is called just after the component updates.
   * It's never called during the first render()
   */
  componentDidUpdate() {
    (function (status) {
      console.log(
        [
          "INIT",
          "WAIT_ANIMATION",
          "START_ANIMATION",
          "SHOW",
          "TRANSITION",
          "HIDE",
        ][status]
      );
    })(this.status);

    let ele = this.el.querySelector(".content-slide-wrapper");

    // According to the status of the content, change the opacity to show or hide
    switch (this.status) {
      case SlideState.INIT:
        if (ele) {
          ele.setAttribute("style", "opacity: 0");
        }
        this.status = SlideState.WAIT_ANIMATION;
        break;

      case SlideState.START_ANIMATION:
        this.getAnimation().then(() => {
          this.status = SlideState.SHOW;
        });
        break;

      case SlideState.SHOW:
        let hideOthers = new CustomEvent("HIDE_LAST_SLIDE", {
          detail: { currentIndex: this.content.index },
        });
        window.dispatchEvent(hideOthers);
        break;

      case SlideState.HIDE:
        if (ele) {
          ele.setAttribute("style", "opacity: 0");
        }
        break;
    }
  }

  /**
   * Lifecycle method that is called once when the component is fully loaded
   * and the first render() occurs.
   *
   * Adds event listeners for "CONTENT_PLAYER_CHANGED" and for "HIDE_LAST_SLIDE"
   */
  componentDidLoad() {
    this.status = SlideState.INIT;
    window.addEventListener("CONTENT_PLAYER_CHANGED", this.contentChanged);
    window.addEventListener("HIDE_LAST_SLIDE", this.hideLastSlide);
  }

  /**
   * When the component is no unloaded, it removes the events listeners for "CONTENT_PLAYER_CHANGED"
   * and for "HIDE_LAST_SLIDE"
   */
  componentDidUnload() {
    window.removeEventListener("CONTENT_PLAYER_CHANGED", this.contentChanged);
    window.removeEventListener("HIDE_LAST_SLIDE", this.hideLastSlide);
  }

  hideLastSlide = (event) => {
    let { currentIndex } = event.detail;
    if (
      this.content.index !== currentIndex &&
      this.status !== SlideState.HIDE
    ) {
      this.status = SlideState.HIDE;
    }
  };

  contentChanged = (event) => {
    let { content } = event.detail;
    if (content === undefined) {
      this.status = SlideState.HIDE;
      this.lastContentId = undefined;
      return;
    }
    if (content.id === this.content.id) {
      this.el.style.zIndex = "2";
      this.status = SlideState.START_ANIMATION;
    } else if (this.content.id === this.lastContentId) {
      this.el.style.zIndex = "1";
    } else {
      this.el.style.zIndex = "0";
      this.status = SlideState.HIDE;
    }
    this.lastContentId = content.id;
  };

  /**
   * Gets animation for the content
   * @return {Promise}
   */
  getAnimation = () => {
    let container = this.el.querySelector(".content-slide-wrapper");

    // Returns animation for the .content-slide-wrapper class
    switch (this.content.animation) {
      // Animation from botton to top
      case "slideUp":
        return velocity(
          container,
          { translateY: "100%", opacity: 1 },
          { duration: 0 }
        ).then(() => {
          return velocity(
            container,
            { translateY: "0%" },
            { duration: 2 * 1000 }
          );
        });

      // Animation from top to bottom
      case "slideDown":
        return velocity(
          container,
          { translateY: "-100%", opacity: 1 },
          { duration: 0 }
        ).then(() => {
          return velocity(
            container,
            { translateY: "0%" },
            { duration: 2 * 1000 }
          );
        });

      // Animation from left to right
      case "slideRight":
        return velocity(
          container,
          { translateX: "-100%", opacity: 1 },
          { duration: 0 }
        ).then(() => {
          return velocity(
            container,
            { translateX: "0%" },
            { duration: 2 * 1000 }
          );
        });

      // Animation from right to left
      case "slideLeft":
        return velocity(
          container,
          { translateX: "100%", opacity: 1 },
          { duration: 0 }
        ).then(() => {
          return velocity(
            container,
            { translateX: "0%" },
            { duration: 2 * 1000 }
          );
        });

      // Fading animation
      case "fade":
        return velocity(container, { opacity: 0 }, { duration: 0 }).then(() => {
          return velocity(container, { opacity: 1 }, { duration: 2 * 1000 });
        });

      // No animation by default
      default:
        return velocity(container, { opacity: 1 }, { duration: 1 });
    }
  };

  render() {
    console.log("content", this.content);
    return (
      <div class="content-slide-wrapper" style={{ opacity: `${this.opacity}` }}>
        {this.content ? renderContentImage(this.content) : null}
        {this.content ? renderContentVideo(this.content, this.status) : null}
        {this.content ? renderCustomContent(this.content, this.status) : null}
      </div>
    );
  }
}
