import { getBaseTextStyle } from "../../common/get-base-text-style";
import checkSlideState from "../../common/text-behaviour";
let weatherInterval;
let weatherObservers = [];
// http://api.openweathermap.org/data/2.5/weather?lat=32.5149469&lon=-117.0382471&appid=<api-key>
const WEATHER_API = "http://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = "0f93a4013a0b381ea772b09917255c1f";
const WEATHER_INTERVAL_TIME = 10 * 60 * 1000; //10 min
// Global variables
let latitude, longitude, lastWeatherStatus, throttlingTimeout;
/**
 *
 * Create query to fetch Open Weather Map API
 * @param {*} latitude - latitude coordenate
 * @param {*} longitude - longitude coordenate
 * @return {string}
 */
function getWeatherQuery(latitude, longitude) {
    return `?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
}
/**
 * Fetches the Open Weather Map API with a query
 * @param {*} latitude - latitude coordenate
 * @param {*} longitude - longitude coordenate
 * @return {Promise}
 */
function requestWeather(latitude, longitude) {
    let url = WEATHER_API + getWeatherQuery(latitude, longitude);
    return fetch(url);
}
const WeatherTagHandler = {
    /**
     * Adds a WeatherTag
     * @param {WeatherTag} observer - Weather tag web component class
     * @return {undefined}
     */
    subscribe(observer) {
        let index = weatherObservers.indexOf(observer);
        if (index === -1) {
            weatherObservers.push(observer);
        }
        this.startWeatherUpdate();
        // Change the weather status if there's a new one
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
    /**
     * Removes a WeatherTag
     * @param {WeatherTag} observer - Weather tag web component class
     * @return {undefined}
     */
    unsubscribe(observer) {
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
    /**
     * Gets weather from coordenates and updates status
     * @return {Promise}
     */
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
    /**
     * Updates the weather interval if it's empty
     * @return {undefined}
     */
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
        /**
         *
         */
        this.weatherChanged = (event) => {
            if (event.detail) {
                Object.assign(this, Object.assign({}, event.detail));
            }
        };
    }
    /**
     * Updates the 'temperatureUnit' and 'temperatureType' props with the values of
     * 'weatherObject' passed as argument
     *
     * As 'init' is called in 'componentWillLoad', it's only executed one time
     * @param {any} attr
     *
     */
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
    /**
     * Lifecycle method that is called once when the component is first
     * connected to the DOM.
     */
    componentWillLoad() {
        this.init(this.weatherObject);
    }
    /**
     * Lifecycle method that is called once when the component is fully loaded
     * and the first render() occurs.
     */
    componentDidLoad() {
        window.addEventListener("WEATHER_DATA_CHANGED", this.weatherChanged);
        WeatherTagHandler.subscribe(this);
    }
    componentDidUnload() {
        window.removeEventListener("WEATHER_DATA_CHANGED", this.weatherChanged);
        WeatherTagHandler.unsubscribe(this);
    }
    /**
     * Generates the corresponding temperature text for the weather tag
     * @param {string} text - Weather information
     * @return {HTMLElement}
     */
    renderTemperature(text) {
        if (this.temperatureType === "temperature") {
            return (h("svg", { viewBox: `0 0 ${this.width * this.scaleX} ${this.height * this.scaleY}` },
                h("text", { x: "0", y: "0", width: "100%", height: "100%", "dominant-baseline": "hanging", fill: this.fill, transform: `scale(${this.scaleX}, ${this.scaleY})` }, text)));
        }
    }
    /**
     * Generates the corresponding weather icon for the weather tag
     * @return {HTMLElement}
     */
    renderIcon() {
        if (this.temperatureType !== "temperature" &&
            this.weather &&
            this.weather[0] &&
            this.weather[0].icon) {
            return (h("img", { class: "weather-icon", src: `http://openweathermap.org/img/w/${this.weather[0].icon}.png` }));
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
