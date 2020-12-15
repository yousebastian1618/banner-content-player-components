import { BaseText } from "./base-text";

function getSvgTextStyle(baseText: BaseText) {
  let style = {};

  if (baseText.stroke) {
    style["stroke"] = `${baseText.stroke}`;
    style["stroke-width"] = `${baseText.strokeWidth}px`;
    style["stroke-linecap"] = `${baseText.strokeLineCap}`;
    style["stroke-linejoin"] = `${baseText.strokeLineJoin}`;
    style["paint-order"] = "stroke";
  }

  return style;
}

function getBaseTextStyle(baseText: BaseText) {
  let style = {
    top: `         ${(baseText.top / baseText.containerHeight) * 100}%`,
    left: `        ${(baseText.left / baseText.containerWidth) * 100}%`,
    width: `       ${(baseText.width / baseText.containerWidth) * 100}%`,
    height: `      ${(baseText.height / baseText.containerHeight) * 100}%`,
    color: `       ${baseText.fill}`,
    "font-size": `   ${baseText.fontSize}px`,
    "font-weight": ` ${baseText.fontWeight}`,
    "font-family": ` ${baseText.fontFamily}`,
    "text-align": `  ${baseText.textAlign}`,
    "font-style": `  ${baseText.fontStyle}`,
    transform: `   rotate(${baseText.angle}deg) scale(${baseText.scaleX}, ${baseText.scaleY})`,
    "transform-origin": `${baseText.originX} ${baseText.originY}`,
    "white-space": "nowrap",
  };

  if (baseText.stroke) {
    style["webkit-text-stroke-color"] = `${baseText.stroke}`;
    style["-webkit-text-stroke-width"] = `${baseText.strokeWidth}`;
  }

  return style;
}

export { getBaseTextStyle, getSvgTextStyle };
