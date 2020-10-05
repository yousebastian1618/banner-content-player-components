import SlideState from "../../common/slide-state";
/**
 * STOP: 0
 * PLAYING: 1
 */
var PlayState;
(function (PlayState) {
  PlayState[(PlayState["STOP"] = 0)] = "STOP";
  PlayState[(PlayState["PLAYING"] = 1)] = "PLAYING";
})(PlayState || (PlayState = {}));
export class VideoTag {
  constructor() {
    this.videoObject = {
      top: 100,
      left: 0,
      width: 100,
      height: 100,
      zIndex: 1,
      src: "http://media.w3.org/2010/05/sintel/trailer.webm",
    };
    this.originX = "top";
    this.originY = "left";
    this.angle = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.alreadyEnded = true;
    this.playState = PlayState.STOP;
    /**
     * Changes 'playState' from 'STOP' to 'PLAYING'
     * and   playing the content.
     *
     * Adds an event listener for "ended" and passes function 'ended' as Callback
     * @return {undefined}
     */
    this.play = () => {
      let ele = this.el.querySelector("video");
      if (ele && this.playState === PlayState.STOP) {
        this.playState = PlayState.PLAYING;
        ele.addEventListener("ended", this.ended);
        ele.play();
      }
    };
    /**
     * Changes 'playState' from 'PLAYING' to 'STOP'
     * and stops playing the content
     *
     * Removes "ended" event listener and dispatches "VIDEO_CONTENT_ENDED"
     * for the Content Player
     */
    this.ended = () => {
      let ele = this.el.querySelector("video");
      if (this.playState === PlayState.PLAYING) {
        this.playState = PlayState.STOP;
        ele.removeEventListener("ended", this.ended);
        let videoEnded = new Event("VIDEO_CONTENT_ENDED");
        window.dispatchEvent(videoEnded);
      }
    };
  }
  /**
   * VideoTag events
   *
   * Listens events:
   *  ended
   *
   * Dispatches events:
   *  VIDEO_CONTENT_ENDED
   */
  /**
   * Updates the 'videoObject' prop with the value of any.
   *
   * As 'init' is called in 'componentWillLoad', it's only executed one time
   * @param {any} videoObject
   */
  init(videoObject) {
    try {
      Object.assign(this, Object.assign({}, videoObject));
    } catch (err) {
      console.log(err.message);
    }
  }
  /**
   * Styling hot fix for video-wrapper div
   */
  changeStyle(attr) {
    try {
      Object.assign(this, Object.assign({}, attr));
    } catch (err) {
      console.log(err.message);
    }
  }
  /**
   * Whenever 'slideState' changes, it runs 'checkSlideState'
   * @param slideState
   * @param oldState
   */
  checkSlideState(slideState, oldState) {
    if (
      oldState === SlideState.SHOW &&
      slideState === SlideState.START_ANIMATION
    ) {
      this.el.querySelector("video").currentTime = 0;
      this.play();
    }
    if (oldState !== slideState) {
      switch (slideState) {
        case SlideState.SHOW:
          this.play();
          break;
        case SlideState.HIDE:
          this.playState = PlayState.STOP;
          this.el.querySelector("video").currentTime = 0;
          this.el
            .querySelector("video")
            .removeEventListener("ended", this.ended);
          break;
      }
    }
  }
  /**
   * Lifecycle method that is called once when the component is first
   * connected to the DOM.
   */
  componentWillLoad() {
    this.init(this.videoObject);
    this.changeStyle(this.adjustment);
  }
  /**
   * Lifecycle method that is called once when the component is fully loaded
   * and the first render() occurs.
   */
  componentDidLoad() {}
  /**
   * Lifecycle method that is called ojust after the component updates. It's never
   * called during the first render
   */
  componentDidUpdate() {}
  render() {
    if (this.src) {
      let style = {
        top: `${(this.top / this.containerHeight) * 100}%`,
        left: `${(this.left / this.containerWidth) * 100}%`,
        // width: `${((this.width * this.scaleX) / this.containerWidth) * 100}%`,
        // height: `${
        //   ((this.height * this.scaleY) / this.containerHeight) * 100
        // }%`,
        width: this.adjustment.width,
        height: this.adjustment.height,
        transform: `rotate(${this.angle}deg)`,
        "transform-origin": `${this.originX} ${this.originY}`,
        zIndex: `${this.zIndex}`,
      };
      return h(
        "div",
        { class: "video-wrapper", style: style },
        h(
          "div",
          { class: "video-helper" },
          h("video", {
            src: this.src,
            autoplay: this.autoplay,
            loop: this.loop,
            muted: true,
          })
        )
      );
    } else return null;
  }
  static get is() {
    return "video-tag";
  }
  static get properties() {
    return {
      adjustment: {
        type: "Any",
        attr: "adjustment",
        watchCallbacks: ["changeStyle"],
      },
      angle: {
        type: Number,
        attr: "angle",
        mutable: true,
      },
      autoplay: {
        type: Boolean,
        attr: "autoplay",
        mutable: true,
      },
      containerHeight: {
        type: Number,
        attr: "container-height",
        mutable: true,
      },
      containerWidth: {
        type: Number,
        attr: "container-width",
        mutable: true,
      },
      el: {
        elementRef: true,
      },
      height: {
        type: Number,
        attr: "height",
        mutable: true,
      },
      left: {
        type: Number,
        attr: "left",
        mutable: true,
      },
      loop: {
        type: Boolean,
        attr: "loop",
        mutable: true,
      },
      originX: {
        type: String,
        attr: "origin-x",
        mutable: true,
      },
      originY: {
        type: String,
        attr: "origin-y",
        mutable: true,
      },
      scaleX: {
        type: Number,
        attr: "scale-x",
        mutable: true,
      },
      scaleY: {
        type: Number,
        attr: "scale-y",
        mutable: true,
      },
      slideState: {
        type: Number,
        attr: "slide-state",
        mutable: true,
        watchCallbacks: ["checkSlideState"],
      },
      src: {
        type: String,
        attr: "src",
        mutable: true,
      },
      top: {
        type: Number,
        attr: "top",
        mutable: true,
      },
      videoObject: {
        type: "Any",
        attr: "video-object",
        watchCallbacks: ["init"],
      },
      width: {
        type: Number,
        attr: "width",
        mutable: true,
      },
      zIndex: {
        type: Number,
        attr: "z-index",
        mutable: true,
      },
    };
  }
  static get style() {
    return "/**style-placeholder:video-tag:**/";
  }
}
