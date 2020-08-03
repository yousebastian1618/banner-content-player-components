import { BaseText } from "./base-text";
declare function getSvgTextStyle(baseText: BaseText): {};
declare function getBaseTextStyle(baseText: BaseText): {
    top: string;
    left: string;
    width: string;
    height: string;
    "z-index": string;
    color: string;
    "font-size": string;
    "font-weight": string;
    "font-family": string;
    "text-align": string;
    "font-style": string;
    transform: string;
    "transform-origin": string;
    "white-space": string;
};
export { getBaseTextStyle, getSvgTextStyle };
