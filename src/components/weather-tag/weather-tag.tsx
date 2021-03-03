import { Component, State, Prop, Watch, Element } from "@stencil/core";
import { BaseText } from "../../common/base-text";
import { getBaseTextStyle } from "../../common/get-base-text-style";
import checkSlideState from "../../common/text-behaviour";
import { getYAdjustment } from "../../common/get-weather-time-text-y-attribute"

let weatherInterval;
let weatherObservers = [];
// https://api.openweathermap.org/data/2.5/weather?lat=32.5149469&lon=-117.0382471&appid=<api-key>
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = "0f93a4013a0b381ea772b09917255c1f";
const WEATHER_INTERVAL_TIME = 10 * 60 * 1000; //10 min

// Global variables
let latitude, longitude, lastWeatherStatus, throttlingTimeout;

//
//
//  Create query to fetch Open Weather Map API
//  @param {*} latitude - latitude coordenate
//  @param {*} longitude - longitude coordenate
//  @return {string}
//
function getWeatherQuery(latitude: number, longitude: number) {
  return `?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
}

//
//  Fetches the Open Weather Map API with a query
//  @param {*} latitude - latitude coordenate
//  @param {*} longitude - longitude coordenate
//  @return {Promise}
//
function requestWeather(latitude: number, longitude: number) {
  let url = WEATHER_API + getWeatherQuery(latitude, longitude);
  return fetch(url);
}

const WeatherTagHandler = {
  //
  //  Adds a WeatherTag
  //  @param {WeatherTag} observer - Weather tag web component class
  //  @return {undefined}
  //
  subscribe(observer: WeatherTag) {
    let index = weatherObservers.indexOf(observer);
    if (index === -1) {
      weatherObservers.push(observer);
    }
    this.startWeatherUpdate();

    // Change the weather status if there's a new one
    if (lastWeatherStatus) {
      Object.assign(observer, lastWeatherStatus);
    } else {
      clearTimeout(throttlingTimeout);
      throttlingTimeout = setTimeout(() => {
        this.getWeatherUpdate();
      }, 500);
    }
  },
  //
  // Removes a WeatherTag
  // @param {WeatherTag} observer - Weather tag web component class
  //  @return {undefined}
  //
  unsubscribe(observer: WeatherTag) {
    let index = weatherObservers.indexOf(observer);
    if (index >= 0) {
      // Removes the WeatherTag element from the array
      weatherObservers.splice(index, 1);
    }

    // If there are no WeatherTag elements in the array, clear properties
    if (weatherObservers.length === 0) {
      clearInterval(weatherInterval);
      weatherInterval = undefined;
      lastWeatherStatus = undefined;
    }
  },
  //
  //  Gets weather from coordenates and updates status
  //  @return {Promise}
  //
  getWeatherUpdate() {
    let geoinfo = window["geoinfo"];
    if (geoinfo) {
      latitude = geoinfo.latitude;
      longitude = geoinfo.longitude;
    }
    return requestWeather(latitude, longitude)
      .then((response) => {
        return response.json().then((data) => {
          // Sets the current weather status
          lastWeatherStatus = {
            weather: data.weather,
            temperature: data.main.temp,
          };
          // Dispatch new event
          let weatherEvent = new CustomEvent("WEATHER_DATA_CHANGED", {
            detail: lastWeatherStatus,
          });
          window.dispatchEvent(weatherEvent);
        });
      })
      .catch((e) => {
        console.log("an error happen getting the weather", e);
      });
  },
  //
  //  Updates the weather interval if it's empty
  //  @return {undefined}
  //
  startWeatherUpdate() {
    if (!weatherInterval) {
      weatherInterval = setInterval(
        this.getWeatherUpdate,
        WEATHER_INTERVAL_TIME
      );
    }
  },
};

@Component({
  tag: "weather-tag",
  styleUrl: "weather-tag.css",
})
export class WeatherTag implements BaseText {
  @Element() el: HTMLStencilElement;
  @Prop() weatherObject: any;
  @Prop({ mutable: true }) originX: string;
  @Prop({ mutable: true }) originY: string;
  @Prop({ mutable: true }) top: number;
  @Prop({ mutable: true }) left: number;
  @Prop({ mutable: true }) width: number;
  @Prop({ mutable: true }) height: number;
  @Prop({ mutable: true }) fill: string;
  @Prop({ mutable: true }) fontSize: number;
  @Prop({ mutable: true }) lineHeight: number;
  @Prop({ mutable: true }) angle: number;
  @Prop({ mutable: true }) scaleX: number;
  @Prop({ mutable: true }) scaleY: number;
  @Prop({ mutable: true }) fontWeight: string;
  @Prop({ mutable: true }) fontFamily: string;
  @Prop({ mutable: true }) textAlign: string;
  @Prop({ mutable: true }) fontStyle: string;
  @Prop({ mutable: true }) stroke: string;
  @Prop({ mutable: true }) strokeWidth: number;
  @Prop({ mutable: true }) strokeLineCap: string;
  @Prop({ mutable: true }) strokeLineJoin: string;
  @Prop({ mutable: true }) zIndex: number;
  @Prop({ mutable: true }) containerHeight: number;
  @Prop({ mutable: true }) containerWidth: number;
  @Prop({ mutable: true }) temperatureUnit = "f";
  @Prop({ mutable: true }) temperatureType = "temperature";
  @Prop({ mutable: true }) latitude: number = 0;
  @Prop({ mutable: true }) longitude: number = 0;
  @Prop({ mutable: true }) slideState: number;
  @State() temperature: number;
  @State() weather: any;

  //
  //  Updates the 'temperatureUnit' and 'temperatureType' props with the values of
  //  'weatherObject' passed as argument
  //
  //  As 'init' is called in 'componentWillLoad', it's only executed one time
  //  @param {any} attr
  //
  //
  @Watch("weatherObject")
  init(attr: any) {
    try {
      Object.assign(
        this,
        { ...attr },
        {
          temperatureUnit: attr.customData.units,
          temperatureType: attr.customData.type,
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  @Watch("slideState")
  checkSlideState(slideState) {
    let ele = this.el.querySelector(".text-wrapper");
    checkSlideState(slideState, ele, this, this.weatherObject);
  }

  //
  //  Lifecycle method that is called once when the component is first
  //  connected to the DOM.
  //
  componentWillLoad() {
    this.init(this.weatherObject);
  }

  //
  //  Lifecycle method that is called once when the component is fully loaded
  //  and the first render() occurs.
  //
  componentDidLoad() {
    window.addEventListener("WEATHER_DATA_CHANGED", this.weatherChanged);
    WeatherTagHandler.subscribe(this);
  }

  componentDidUnload() {
    window.removeEventListener("WEATHER_DATA_CHANGED", this.weatherChanged);
    WeatherTagHandler.unsubscribe(this);
  }

  weatherChanged = (event) => {
    if (event.detail) {
      Object.assign(this, { ...event.detail });
    }
  };

  //
  //  Generates the corresponding temperature text for the weather tag
  //  @param {string} text - Weather information
  //  @return {HTMLElement}
  //
  renderTemperature(text) {
    if (this.temperatureType === "temperature") {

      const svgStyle = {
        'text-anchor': 'middle',
        transform: 'translate(50%, 0%)'
      }

      return (
        <svg
          viewBox={`0 0 ${this.width * this.scaleX} ${
            this.height * this.scaleY
          }`}
          style={svgStyle}
        >
          <text
            x="0"
            y={getYAdjustment(this)}
            width="100%"
            height="100%"
            dominant-baseline="hanging"
            fill={this.fill}
            transform={`scale(${this.scaleX}, ${this.scaleY})`}
          >
            {text}
          </text>
        </svg>
      );
    }
  }

  //
  //  Generates the corresponding weather icon for the weather tag
  //  @return {HTMLElement}
  //
  renderIcon() {
    if (
      this.temperatureType !== "temperature" &&
      this.weather &&
      this.weather[0] &&
      this.weather[0].icon
    ) {
      return (
        <img
          class="weather-icon"
          src={`https://openweathermap.org/img/w/${this.weather[0].icon}.png`}
        />
      );
    }
  }

  render() {
    let text = "";
    if (this.temperature) {
      if (this.temperatureUnit === "c") {
        let celcius = this.temperature - 273.15;
        text = `${Math.ceil(celcius)} °C`;
      } else {
        let farenheit = (this.temperature - 273.15) * 1.8 + 32.0;
        text = `${Math.ceil(farenheit)} °F`;
      }
    }
    return (
      <div class="text-wrapper" style={getBaseTextStyle(this)}>
        {this.renderTemperature(text)}
        {this.renderIcon()}
      </div>
    );
  }
}
