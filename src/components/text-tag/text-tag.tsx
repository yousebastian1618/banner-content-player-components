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

  //
  //  Updates the 'textObject' prop with the value of attr.
  //
  //  As 'init' is called in 'componentWillLoad', it's only executed one time
  //  @param {any} attr
  //
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

  //
  //  Lifecycle method that is called once when the component is first
  //  connected to the DOM.
  //
  componentWillLoad() {
    this.init(this.textObject);
  }

  //
  //  Lifecycle method that is called once when the component is fully loaded
  //  and the first render() occurs.
  //
  componentDidLoad() {}

  render() {
    if (this.text) {
      const customContentContainerWidth = document.getElementsByClassName(
        "custom-content-container"
      )[0].clientWidth;
      const deviceWidth = window["device_window_size"].width;

      let previewerAdjustment = 1;
      if (deviceWidth != customContentContainerWidth) {
        console.log('here')
        previewerAdjustment = customContentContainerWidth / deviceWidth;
      }

      let translation = 0;
      if (this.textAlign === "right") {
        translation = (this.width * previewerAdjustment * this.scaleX) / 2;
      }

      const getTextYAttribute = function(baseText){
        let adj = 0
        const f = baseText.fontSize

        if(baseText.fontFamily === 'Tahoma'){
          console.log('tahoma')
            adj = -.3
          if(f>=21){
           adj+= ((f - 20) / 10) * -.325
          }
        }
        else if(baseText.fontFamily === 'Impact'){
          console.log('Impact');
          adj = -.3;
          if(f>=21){
            adj+= ((f-20)/10) * -.25
          }
        }
        else if(baseText.fontFamily === 'Georgia'){
          console.log("GEORGIA")
          adj = .2;
          if(f>=21){
            adj = .2 - ((f-20)/10) * .06
            console.log('adj', adj)
          }
        }
        else if(baseText.fontFamily === 'Times New Roman'){
          adj = .2;
          if(f>=21){
            adj = .2 + ((f-20)/10) * .085
          }
        }
        else if(baseText.fontFamily === 'Verdana'){
          console.log('verdana')
          if(f<20){
            adj = -.2;
          }
          else if(f>=21 && f <=59){
            adj = -.8
          }
          else{
            adj = -.8 - ((f-50)/10) * .3 
          }
        }
        console.log('FONT SIZE', baseText.fontSize, "---ADJ:", adj)
        return adj
      }

      // const xAdjustment = function(baseText){
      //   if(baseText.fontFamily === 'Georgia'){
      //     console.log('x geo')
      //     if(baseText.fontSize <=65){
      //       return .3
      //     }
      //     else return .4
      //   }
      //   if(baseText.fontfamily === 'Times New Roman'){
      //     return .3
      //   }
      //   return .2
      // }

      return (
        <div class="text-wrapper" style={getBaseTextStyle(this)}>
          <svg>
            <text
              x="0"
              y={`${getTextYAttribute(this)}`}
              width="100%"
              height="100%"
              dominant-baseline="hanging"
              fill={this.fill}
              style={getSvgTextStyle(this)}
              transform={`translate(${translation})`}
            >
              {renderMultiline(this, previewerAdjustment, 0)}
            </text>
          </svg>
        </div>
      );
    }
  }
}
