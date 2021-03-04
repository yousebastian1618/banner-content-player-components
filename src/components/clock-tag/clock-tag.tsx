import { Component, State, Prop, Watch, Element } from "@stencil/core";
import moment from "moment";
// import "moment/locale"
// import 'moment/locale/en-gb';
import { BaseText } from "../../common/base-text";
import { getBaseTextStyle } from "../../common/get-base-text-style";
import checkSlideState from "../../common/text-behaviour";
import { getYAdjustment } from "../../common/get-weather-time-text-y-attribute"

let clockInterval;

//
// Array of clock-tag elements
//
let clockObservers;

const clockHandler = {
  //
  // Initilizes the clockObservers array
  //
  init() {
    if (!clockObservers) {
      clockObservers = [];
    }
  },
  //
  //  Adds a ClockTag
  //  @param {ClockTag} observer
  //  @return {undefined}
  //
  subscribe(observer: ClockTag) {
    let index = clockObservers.indexOf(observer);
    // Adds the ClockTag to the array if it's not present
    if (index === -1) {
      clockObservers.push(observer);
      observer.time = moment();
    }

    // Sets the time interval for every ClockTag
    if (!clockInterval) {
      clockInterval = setInterval(() => {
        let time = moment();
        clockObservers.forEach((observer: ClockTag) => {
          observer.time = time;
        });
      }, 1000);
    }
  },
  //
  //  Removes a ClockTag
  //  @param observer
  //  @return {undefined}
  //
  unsubscribe(observer: ClockTag) {
    let index = clockObservers.indexOf(observer);
    if (index >= 0) {
      clockObservers.splice(index, 1);
    }
    if (clockObservers.length === 0) {
      clearInterval(clockInterval);
    }
  },
};

@Component({
  tag: "clock-tag",
  styleUrl: "clock-tag.css",
  shadow: false,
})
export class ClockTag implements BaseText {
  @Element() el: HTMLStencilElement;
  @Prop() clockObject: any;
  @Prop({ mutable: true }) originX: string;
  @Prop({ mutable: true }) originY: string;
  @Prop({ mutable: true }) top: number;
  @Prop({ mutable: true }) left: number;
  @Prop({ mutable: true }) width: number;
  @Prop({ mutable: true }) height: number;
  @Prop({ mutable: true }) fill: string;
  @Prop({ mutable: true }) fontSize: number;
  @Prop({ mutable: true }) angle: number;
  @Prop({ mutable: true }) scaleX: number;
  @Prop({ mutable: true }) scaleY: number;
  @Prop({ mutable: true }) fontWeight: string;
  @Prop({ mutable: true }) fontFamily: string;
  @Prop({ mutable: true }) textAlign: string;
  @Prop({ mutable: true }) fontStyle: string;
  @Prop({ mutable: true }) lineHeight: number;
  @Prop({ mutable: true }) stroke: string;
  @Prop({ mutable: true }) strokeWidth: number;
  @Prop({ mutable: true }) strokeLineCap: string;
  @Prop({ mutable: true }) strokeLineJoin: string;
  @Prop({ mutable: true }) zIndex: number;
  @Prop({ mutable: true }) containerHeight: number;
  @Prop({ mutable: true }) containerWidth: number;
  @Prop({ mutable: true }) customMask = "HH:mm:ss";
  @Prop({ mutable: true }) slideState: number;
  @State() public time;
  public clockId;

  //
  //  Updates the 'clockObject' and the 'customMask' properties
  //
  //  As 'init' is called in 'componentWillLoad', it's only executed one time
  //  @param {any} attr
  //
  //
  @Watch("clockObject")
  init(attr: any) {
    try {
      Object.assign(this, { ...attr }, { customMask: attr.customData.mask });
    } catch (err) {
      console.log(err.message);
    }
  }

  @Watch("slideState")
  checkSlideState(slideState) {
    let ele = this.el.querySelector(".text-wrapper");
    checkSlideState(slideState, ele, this, this.clockObject);
  }

  //
  //  Lifecycle method that is called once when the component is first
  //  connected to the DOM.
  //
  componentWillLoad() {
    clockHandler.init();
    this.init(this.clockObject);
  }

  //
  //  Lifecycle method that is called once when the component is fully loaded
  //  and the first render() occurs.
  //
  componentDidLoad() {
    clockHandler.subscribe(this);
  }

  render() {
    let time = "";
    if (this.time) {
      time = this.time.format(this.customMask);
    }

    return (
      <div class="text-wrapper" style={getBaseTextStyle(this)}>
        <svg
          viewBox={`0 0 ${this.width * this.scaleX} ${
            this.height * this.scaleY
          }`}
        >
          <text
            x="0"
            y={getYAdjustment(this)}
            width="100%"
            height="100%"
            dominant-baseline="hanging"
            fill={this.fill}
            transform={`scale(${this.scaleX},${this.scaleY})`}
          >
            {time}
          </text>
        </svg>
      </div>
    );
  }
}
