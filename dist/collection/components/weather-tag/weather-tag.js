import { getBaseTextStyle } from "../../common/get-base-text-style";
import checkSlideState from "../../common/text-behaviour";
import { getYAdjustment } from "../../common/get-weather-time-text-y-attribute";
let weatherInterval;
let weatherObservers = [];
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = "0f93a4013a0b381ea772b09917255c1f";
const WEATHER_INTERVAL_TIME = 10 * 60 * 1000;
let latitude, longitude, lastWeatherStatus, throttlingTimeout;
function getWeatherQuery(latitude, longitude) {
    return `?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
}
function requestWeather(latitude, longitude) {
    let url = WEATHER_API + getWeatherQuery(latitude, longitude);
    return fetch(url);
}
const WeatherTagHandler = {
    subscribe(observer) {
        let index = weatherObservers.indexOf(observer);
        if (index === -1) {
            weatherObservers.push(observer);
        }
        this.startWeatherUpdate();
        if (lastWeatherStatus) {
            Object.assign(observer, lastWeatherStatus);
        }
        else {
            clearTimeout(throttlingTimeout);
            throttlingTimeout = setTimeout(() => {
                this.getWeatherUpdate();
            }, 500);
        }
    },
    unsubscribe(observer) {
        let index = weatherObservers.indexOf(observer);
        if (index >= 0) {
            weatherObservers.splice(index, 1);
        }
        if (weatherObservers.length === 0) {
            clearInterval(weatherInterval);
            weatherInterval = undefined;
            lastWeatherStatus = undefined;
        }
    },
    getWeatherUpdate() {
        let geoinfo = window["geoinfo"];
        if (geoinfo) {
            latitude = geoinfo.latitude;
            longitude = geoinfo.longitude;
        }
        return requestWeather(latitude, longitude)
            .then((response) => {
            return response.json().then((data) => {
                lastWeatherStatus = {
                    weather: data.weather,
                    temperature: data.main.temp,
                };
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
    startWeatherUpdate() {
        if (!weatherInterval) {
            weatherInterval = setInterval(this.getWeatherUpdate, WEATHER_INTERVAL_TIME);
        }
    },
};
export class WeatherTag {
    constructor() {
        this.temperatureUnit = "f";
        this.temperatureType = "temperature";
        this.latitude = 0;
        this.longitude = 0;
        this.weatherChanged = (event) => {
            if (event.detail) {
                Object.assign(this, Object.assign({}, event.detail));
            }
        };
    }
    init(attr) {
        try {
            Object.assign(this, Object.assign({}, attr), {
                temperatureUnit: attr.customData.units,
                temperatureType: attr.customData.type,
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    checkSlideState(slideState) {
        let ele = this.el.querySelector(".text-wrapper");
        checkSlideState(slideState, ele, this, this.weatherObject);
    }
    componentWillLoad() {
        this.init(this.weatherObject);
    }
    componentDidLoad() {
        window.addEventListener("WEATHER_DATA_CHANGED", this.weatherChanged);
        WeatherTagHandler.subscribe(this);
    }
    componentDidUnload() {
        window.removeEventListener("WEATHER_DATA_CHANGED", this.weatherChanged);
        WeatherTagHandler.unsubscribe(this);
    }
    renderTemperature(text) {
        if (this.temperatureType === "temperature") {
            const svgStyle = {
                'text-anchor': 'middle',
                transform: 'translate(50%, 0%)'
            };
            return (h("svg", { viewBox: `0 0 ${this.width * this.scaleX} ${this.height * this.scaleY}`, style: svgStyle },
                h("text", { x: "0", y: getYAdjustment(this), width: "100%", height: "100%", "dominant-baseline": "hanging", fill: this.fill, transform: `scale(${this.scaleX}, ${this.scaleY})` }, text)));
        }
    }
    renderIcon() {
        if (this.temperatureType !== "temperature" &&
            this.weather &&
            this.weather[0] &&
            this.weather[0].icon) {
            return (h("img", { class: "weather-icon", src: `https://openweathermap.org/img/w/${this.weather[0].icon}.png` }));
        }
    }
    render() {
        let text = "";
        if (this.temperature) {
            if (this.temperatureUnit === "c") {
                let celcius = this.temperature - 273.15;
                text = `${Math.ceil(celcius)} °C`;
            }
            else {
                let farenheit = (this.temperature - 273.15) * 1.8 + 32.0;
                text = `${Math.ceil(farenheit)} °F`;
            }
        }
        return (h("div", { class: "text-wrapper", style: getBaseTextStyle(this) },
            this.renderTemperature(text),
            this.renderIcon()));
    }
    static get is() { return "weather-tag"; }
    static get properties() { return {
        "angle": {
            "type": Number,
            "attr": "angle",
            "mutable": true
        },
        "containerHeight": {
            "type": Number,
            "attr": "container-height",
            "mutable": true
        },
        "containerWidth": {
            "type": Number,
            "attr": "container-width",
            "mutable": true
        },
        "el": {
            "elementRef": true
        },
        "fill": {
            "type": String,
            "attr": "fill",
            "mutable": true
        },
        "fontFamily": {
            "type": String,
            "attr": "font-family",
            "mutable": true
        },
        "fontSize": {
            "type": Number,
            "attr": "font-size",
            "mutable": true
        },
        "fontStyle": {
            "type": String,
            "attr": "font-style",
            "mutable": true
        },
        "fontWeight": {
            "type": String,
            "attr": "font-weight",
            "mutable": true
        },
        "height": {
            "type": Number,
            "attr": "height",
            "mutable": true
        },
        "latitude": {
            "type": Number,
            "attr": "latitude",
            "mutable": true
        },
        "left": {
            "type": Number,
            "attr": "left",
            "mutable": true
        },
        "lineHeight": {
            "type": Number,
            "attr": "line-height",
            "mutable": true
        },
        "longitude": {
            "type": Number,
            "attr": "longitude",
            "mutable": true
        },
        "originX": {
            "type": String,
            "attr": "origin-x",
            "mutable": true
        },
        "originY": {
            "type": String,
            "attr": "origin-y",
            "mutable": true
        },
        "scaleX": {
            "type": Number,
            "attr": "scale-x",
            "mutable": true
        },
        "scaleY": {
            "type": Number,
            "attr": "scale-y",
            "mutable": true
        },
        "slideState": {
            "type": Number,
            "attr": "slide-state",
            "mutable": true,
            "watchCallbacks": ["checkSlideState"]
        },
        "stroke": {
            "type": String,
            "attr": "stroke",
            "mutable": true
        },
        "strokeLineCap": {
            "type": String,
            "attr": "stroke-line-cap",
            "mutable": true
        },
        "strokeLineJoin": {
            "type": String,
            "attr": "stroke-line-join",
            "mutable": true
        },
        "strokeWidth": {
            "type": Number,
            "attr": "stroke-width",
            "mutable": true
        },
        "temperature": {
            "state": true
        },
        "temperatureType": {
            "type": String,
            "attr": "temperature-type",
            "mutable": true
        },
        "temperatureUnit": {
            "type": String,
            "attr": "temperature-unit",
            "mutable": true
        },
        "textAlign": {
            "type": String,
            "attr": "text-align",
            "mutable": true
        },
        "top": {
            "type": Number,
            "attr": "top",
            "mutable": true
        },
        "weather": {
            "state": true
        },
        "weatherObject": {
            "type": "Any",
            "attr": "weather-object",
            "watchCallbacks": ["init"]
        },
        "width": {
            "type": Number,
            "attr": "width",
            "mutable": true
        },
        "zIndex": {
            "type": Number,
            "attr": "z-index",
            "mutable": true
        }
    }; }
    static get style() { return "/**style-placeholder:weather-tag:**/"; }
}
