import { Component, Element, Prop } from "@stencil/core";

@Component({
  tag: "content-player-tag",
  styleUrl: "content-player-tag.css",
})
export class ContentPlayerTag {
  @Element() el: HTMLStencilElement;
  @Prop({ mutable: true }) slides: any = [];
  @Prop({ mutable: true }) currentContentId: string;

  /**
   * ContentPlayerTag events
   *
   * Listens events:
   *  CONTENT_PLAYER_LOAD
   *  CONTENT_PLAYER_CHANGED
   *
   * Dispatches events:
   *  CONTENT_PLAYER_CLOSE
   */

  /**
   * Lifecycle method that is called once when the component is fully loaded
   * and the first render() occurs.
   *
   * Adds event listeners for "CONTENT_PLAYER_CHANGED" and for "CONTENT_PLAYER_LOAD"
   */
  componentDidLoad() {
    window.addEventListener("CONTENT_PLAYER_LOAD", this.loadContents);
    window.addEventListener("CONTENT_PLAYER_CHANGED", this.playNextContent);
  }

  /**
   * Removes event listeners for "CONTENT_PLAYER_LOAD" and for "CONTENT_PLAYER_CHANGED"
   */
  componentDidUnload() {
    window.removeEventListener("CONTENT_PLAYER_LOAD", this.loadContents);
    window.removeEventListener("CONTENT_PLAYER_CHANGED", this.playNextContent);
    let closeEvent = new Event("CONTENT_PLAYER_CLOSE");
    window.dispatchEvent(closeEvent);
  }

  /**
   * Loads contents into the array of slides. Each content represents a slide
   * Starts showing the current content
   * @param {any} event
   * @return {undefined}
   */
  loadContents = (event) => {
    this.el.style.opacity = "0";
    this.slides = event.detail;
  };

  /**
   * Stops showing current content to play the next one
   * @return {undefined}
   */
  playNextContent = () => {
    this.el.style.opacity = "1";
  };

  render() {
    return (
      <div class="content-player-wrapper">
        {this.slides.map((slideObject) => {
          return (
            <content-slide-tag
              contentSlideObject={slideObject}
            ></content-slide-tag>
          );
        })}
      </div>
    );
  }
}
