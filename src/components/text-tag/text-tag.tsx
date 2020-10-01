import { Component, Prop, Watch, Element } from "@stencil/core";
import { BaseText } from "../../common/base-text";
import {
  getBaseTextStyle,
  getSvgTextStyle,
} from "../../common/get-base-text-style";
import checkSlideState from "../../common/text-behaviour";
import renderMultiline from "../../common/text-multiline";

@Component({
  tag: "text-tag",
  styleUrl: "text-tag.css",
})
export class TextTag implements BaseText {
  @Element() el: HTMLStencilElement;
  @Prop() textObject: any;
  @Prop({ mutable: true }) originX: string;
  @Prop({ mutable: true }) originY: string;
  @Prop({ mutable: true }) top: number;
  @Prop({ mutable: true }) left: number;
  @Prop({ mutable: true }) width: number;
  @Prop({ mutable: true }) height: number;
  @Prop({ mutable: true }) fill = "red";
  @Prop({ mutable: true }) fontSize = 12;
  @Prop({ mutable: true }) angle = 0;
  @Prop({ mutable: true }) scaleX = 1;
  @Prop({ mutable: true }) scaleY = 1;
  @Prop({ mutable: true }) fontWeight = "normal";
  @Prop({ mutable: true }) fontFamily = "Arial";
  @Prop({ mutable: true }) textAlign = "center";
  @Prop({ mutable: true }) fontStyle = "normal";
  @Prop({ mutable: true }) lineHeight: number;
  @Prop({ mutable: true }) stroke = "";
  @Prop({ mutable: true }) strokeWidth = 0;
  @Prop({ mutable: true }) strokeLineCap: string;
  @Prop({ mutable: true }) strokeLineJoin: string;
  @Prop({ mutable: true }) zIndex = 1;
  @Prop({ mutable: true }) text = "";
  @Prop({ mutable: true }) containerHeight: number;
  @Prop({ mutable: true }) containerWidth: number;
  @Prop({ mutable: true }) slideState: number;

  /**
   * Updates the 'textObject' prop with the value of attr.
   *
   * As 'init' is called in 'componentWillLoad', it's only executed one time
   * @param {any} attr
   */
  @Watch("textObject")
  init(attr: any) {
    try {
      Object.assign(this, { ...attr });
    } catch (err) {
      console.log(err.message);
    }
  }

  @Watch("slideState")
  checkSlideState(slideState) {
    let ele = this.el.querySelector(".text-wrapper");
    checkSlideState(slideState, ele, this, this.textObject);
  }

  /**
   * Lifecycle method that is called once when the component is first
   * connected to the DOM.
   */
  componentWillLoad() {
    this.init(this.textObject);
  }

  /**
   * Lifecycle method that is called once when the component is fully loaded
   * and the first render() occurs.
   */
  componentDidLoad() {}

  render() {
    if (this.text) {
      return (
        <div class="text-wrapper" style={getBaseTextStyle(this)}>
          <svg
            viewBox={`0 0 ${this.width * this.scaleX} ${
              this.height * this.scaleY
            }`}
          >
            <text
              x="0"
              y="0"
              width="100%"
              height="100%"
              dominant-baseline="hanging"
              fill={this.fill}
              style={getSvgTextStyle(this)}
              transform={`scale(${this.scaleX},${this.scaleY})`}
            >
              {renderMultiline(this)}
            </text>
          </svg>
        </div>
      );
    }
  }
}
