import { Component, Element, Prop, Watch } from "@stencil/core";
import SlideState from "../../common/slide-state";

/**
 * STOP: 0
 * PLAYING: 1
 */
enum PlayState {
  STOP,
  PLAYING,
}

@Component({
  tag: "video-tag",
  styleUrl: "video-tag.css",
})
export class VideoTag {
  @Element() el!: HTMLStencilElement;
  @Prop() videoObject: any = {
    top: 100,
    left: 0,
    width: 100,
    height: 100,
    zIndex: 1,
    src: "http://media.w3.org/2010/05/sintel/trailer.webm",
  };
  @Prop() adjustment: any;
  @Prop({ mutable: true }) originX: string = "top";
  @Prop({ mutable: true }) originY: string = "left";
  @Prop({ mutable: true }) top: number;
  @Prop({ mutable: true }) left: number;
  @Prop({ mutable: true }) width: number;
  @Prop({ mutable: true }) height: number;
  @Prop({ mutable: true }) angle: number = 0;
  @Prop({ mutable: true }) scaleX: number = 1;
  @Prop({ mutable: true }) scaleY: number = 1;
  @Prop({ mutable: true }) zIndex: number;
  @Prop({ mutable: true }) src: string;
  @Prop({ mutable: true }) loop: boolean;
  @Prop({ mutable: true }) autoplay: boolean;
  @Prop({ mutable: true }) containerWidth: number;
  @Prop({ mutable: true }) containerHeight: number;
  @Prop({ mutable: true }) slideState: number;
  alreadyEnded: boolean = true;
  playState: PlayState = PlayState.STOP;

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
  @Watch("videoObject")
  init(videoObject: any) {
    try {
      Object.assign(this, { ...videoObject });
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
   * Styling hot fix for video-wrapper div
   */
  @Watch("adjustment")
  changeStyle(attr: any) {
    try {
      Object.assign(this.adjustment, { ...attr });
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
   * Whenever 'slideState' changes, it runs 'checkSlideState'
   * @param slideState
   * @param oldState
   */
  @Watch("slideState")
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

  /**
   * Changes 'playState' from 'STOP' to 'PLAYING'
   * and   playing the content.
   *
   * Adds an event listener for "ended" and passes function 'ended' as Callback
   * @return {undefined}
   */
  play = () => {
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
  ended = () => {
    let ele = this.el.querySelector("video");
    if (this.playState === PlayState.PLAYING) {
      this.playState = PlayState.STOP;
      ele.removeEventListener("ended", this.ended);
      let videoEnded = new Event("VIDEO_CONTENT_ENDED");
      window.dispatchEvent(videoEnded);
    }
  };

  render() {
    if (this.src) {
      let style = {
        top: `${(this.top / this.containerHeight) * 100}%`,
        left: `${(this.left / this.containerWidth) * 100}%`,
        "min-width": `${
          ((this.width * this.scaleX) / this.containerWidth) * 100
        }%`,
        height: `${
          ((this.height * this.scaleY) / this.containerHeight) * 100
        }%`,
        transform: `rotate(${this.angle}deg)`,
        "transform-origin": `${this.originX} ${this.originY}`,
        zIndex: `${this.zIndex}`,
      };

      if (this.adjustment) {
        style.height = this.adjustment.height;
        style["min-width"] = this.adjustment.width;
      }

      return (
        <div class="video-wrapper" style={style}>
          <div class="video-helper">
            <video
              src={this.src}
              autoplay={this.autoplay}
              loop={this.loop}
              muted
            />
          </div>
        </div>
      );
    } else return null;
  }
}
