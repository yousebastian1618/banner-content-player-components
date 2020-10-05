import { Component, Prop } from "@stencil/core";

// const base64x64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wIbEQkKjS/bYgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAATUlEQVRo3u3PQQ0AAAgEILV/5zOFDzdoQCepz6aeExAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQELi3cqoDfV7ZY54AAAAASUVORK5CYII=";

@Component({
  tag: "loading-content-tag",
  styleUrl: "loading-content-tag.css",
})
export class LoadingContentTag {
  @Prop({ mutable: true }) state: string;
  @Prop({ mutable: true }) progress: number;
  @Prop({ mutable: true }) visible: boolean;
  @Prop({ mutable: true }) current: number = 0;
  @Prop({ mutable: true }) total: number = 0;
  @Prop({ mutable: true }) containerWidth: number = 0;
  @Prop({ mutable: true }) containerHeight: number = 0;

  /**
   * LoadingContentTag events
   *
   * Listens events:
   *  CONTENT_STATUS
   *
   */

  /**
   * Lifecycle method that is called once when the component is fully loaded
   * and the first render() occurs.
   *
   * Adds an event listener for 'CONTENT_STATUS' and passes changeState as a Callback
   */
  componentDidLoad() {
    window.addEventListener("CONTENT_STATUS", this.changeState);
  }

  /**
   * Changes state according to the event presented
   */
  changeState = (event) => {
    let {
      state,
      progress,
      current,
      total,
      containerWidth,
      containerHeight,
    } = event.detail;
    this.state = state;
    this.progress = progress;
    this.current = current;
    this.total = total;

    if (containerWidth !== undefined) {
      this.containerWidth = containerWidth;
    }

    if (containerHeight !== undefined) {
      this.containerHeight = containerHeight;
    }
  };

  render() {
    let min =
      this.containerWidth < this.containerHeight
        ? this.containerWidth
        : this.containerHeight;
    return (
      <div class="loading-content">
        <div
          class="loader-wrapper"
          style={{
            display: this.state === "loading" ? "block" : "none",
            width: `${this.containerWidth}px`,
            height: `${this.containerHeight}px`,
          }}
        >
          {/* <img class="ratio" src={ base64x64Image } alt="" width="64" height="64"/> */}
          <div
            class="lds-ellipsis"
            style={{ width: `${min * 0.9}px`, height: `${min * 0.9}px` }}
          >
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
        <div
          class="progress-bar-wrapper"
          style={{ display: this.state === "downloading" ? "flex" : "none" }}
        >
          <span
            style={{
              "font-size": `${this.containerWidth * 0.8 * 0.041 * 0.6}px`,
            }}
          >
            Downloading contents {`(${this.current}/${this.total})`}{" "}
          </span>
          <br />
          <progress-bar-tag
            progress={this.progress}
            visible={true}
            base-color="#00ACC2"
            secondary-color="#407C84"
            container-width={this.containerWidth}
          ></progress-bar-tag>
        </div>
        <content-player-tag
          style={{ display: this.state === "playing" ? "block" : "none" }}
        ></content-player-tag>
      </div>
    );
  }
}
