import { Component, Prop, Element } from "@stencil/core";

const base64GifImage =
  "data:image/gif;base64,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";

@Component({
  tag: "progress-bar-tag",
  styleUrl: "progress-bar-tag.css",
})
export class ProgressBarTag {
  @Element() el: HTMLStencilElement;
  @Prop() progress: number = 0;
  @Prop() visible: boolean = false;
  @Prop() baseColor: string;
  @Prop() secondaryColor: string;
  @Prop() containerWidth: number;

  //
  //  Lifecycle method that is called once when the component is first
  //  connected to the DOM.
  //
  componentWillLoad() {}

  //
  //  Lifecycle method that is called once when the component is fully loaded
  //  and the first render() occurs.
  //
  componentDidLoad() {}

  render() {
    if (this.visible) {
      let progress = this.progress || 0;
      progress = Math.ceil(progress);
      return (
        <div class="progress-bar">
          <div
            class="progress-bar-indicator"
            style={{
              width: `${this.progress}%`,
              "background-color": `${this.baseColor}`,
            }}
          ></div>
          <div
            class="black-layer"
            style={{
              "background-color": `${this.secondaryColor}`,
              opacity: "0.6",
            }}
          />
          <img class="progress-animation" src={base64GifImage} />
          <span
            class="message"
            style={{
              "font-size": `${this.containerWidth * 0.8 * 0.041 * 0.8}px`,
            }}
          >
            {progress}%
          </span>
        </div>
      );
    }
  }
}
