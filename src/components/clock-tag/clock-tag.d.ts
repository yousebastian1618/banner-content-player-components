import '../../../dist/types/stencil.core';
import { BaseText } from '../../common/base-text';
export declare class ClockTag implements BaseText {
    el: HTMLStencilElement;
    clockObject: any;
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
    containerHeight: number;
    containerWidth: number;
    customMask: string;
    slideState: number;
    time: any;
    clockId: any;
    init(attr: any): void;
    checkSlideState(slideState: any): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): JSX.Element;
}