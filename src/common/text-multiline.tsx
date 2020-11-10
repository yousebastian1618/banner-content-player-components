function renderMultiline(
  { text, lineHeight, textAlign, fontSize, width, scaleX }: any,
  previewerAdjustment
) {
  let decimal = parseFloat(lineHeight) % 1;
  let anchor = "start";
  if (textAlign === "center") {
    anchor = "middle";
  } else if (textAlign === "right") {
    anchor = "end";
  }
  let lines = text.split("\n").map((t, i) => {
    let style = {
      fontSize: fontSize + "px",
      lineHeight: lineHeight + "px",
    };

    if (previewerAdjustment) {
      const newFontSize = fontSize * previewerAdjustment;
      const newLineHeight = lineHeight / previewerAdjustment;
      style.fontSize = newFontSize + "px";
      style.lineHeight = newLineHeight + "px";
    }

    let xPosition = 0;

    if (textAlign !== "left") {
      xPosition = (width * previewerAdjustment * scaleX) / 2;
    }

    return (
      <tspan
        style={style}
        x={xPosition}
        dy={i === 0 ? `${decimal}em` : `${parseFloat(lineHeight) + decimal}em`}
        text-anchor={anchor}
      >
        {t}
      </tspan>
    );
  });
  return lines;
}

export default renderMultiline;
