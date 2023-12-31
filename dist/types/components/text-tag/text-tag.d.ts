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
    init(attr: any): void;
    checkSlideState(slideState: any): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
