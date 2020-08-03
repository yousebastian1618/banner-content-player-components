import '../../stencil.core';
import { BaseText } from "../../common/base-text";
export declare class WeatherTag implements BaseText {
    el: HTMLStencilElement;
    weatherObject: any;
    originX: string;
    originY: string;
    top: number;
    left: number;
    width: number;
    height: number;
    fill: string;
    fontSize: number;
    lineHeight: number;
    angle: number;
    scaleX: number;
    scaleY: number;
    fontWeight: string;
    fontFamily: string;
    textAlign: string;
    fontStyle: string;
    stroke: string;
    strokeWidth: number;
    strokeLineCap: string;
    strokeLineJoin: string;
    zIndex: number;
    containerHeight: number;
    containerWidth: number;
    temperatureUnit: string;
    temperatureType: string;
    latitude: number;
    longitude: number;
    slideState: number;
    temperature: number;
    weather: any;
    /**
     * Updates the 'temperatureUnit' and 'temperatureType' props with the values of
     * 'weatherObject' passed as argument
     *
     * As 'init' is called in 'componentWillLoad', it's only executed one time
     * @param {any} attr
     *
     */
    init(attr: any): void;
    checkSlideState(slideState: any): void;
    /**
     * Lifecycle method that is called once when the component is first
     * connected to the DOM.
     */
    componentWillLoad(): void;
    /**
     * Lifecycle method that is called once when the component is fully loaded
     * and the first render() occurs.
     */
    componentDidLoad(): void;
    componentDidUnload(): void;
    /**
     *
     */
    weatherChanged: (event: any) => void;
    /**
     * Generates the corresponding temperature text for the weather tag
     * @param {string} text - Weather information
     * @return {HTMLElement}
     */
    renderTemperature(text: any): JSX.Element;
    /**
     * Generates the corresponding weather icon for the weather tag
     * @return {HTMLElement}
     */
    renderIcon(): JSX.Element;
    render(): JSX.Element;
}
