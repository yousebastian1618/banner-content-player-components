import '../../stencil.core';
import { BaseText } from "../../common/base-text";
export declare class TextTag implements BaseText {
    el: HTMLStencilElement;
    textObject: any;
    originX: string;
    originY: string;
    top: number;
    left: number;
    width: number;
    height: number;
    fill: string;
    fontSize: number;
    angle: number;
    scaleX: number;
    scaleY: number;
    fontWeight: string;
    fontFamily: string;
    textAlign: string;
    fontStyle: string;
    lineHeight: number;
    stroke: string;
    strokeWidth: number;
    strokeLineCap: string;
    strokeLineJoin: string;
    zIndex: number;
    text: string;
    containerHeight: number;
    containerWidth: number;
    slideState: number;
    /**
     * Updates the 'textObject' prop with the value of attr.
     *
     * As 'init' is called in 'componentWillLoad', it's only executed one time
     * @param {any} attr
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
    render(): JSX.Element;
}
