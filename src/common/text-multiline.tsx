function renderMultiline({ text, lineHeight, textAlign, fontSize }: any) {
  let decimal = parseFloat(lineHeight) % 1;
  let anchor = "start";
  if (textAlign === "center") {
    anchor = "middle";
  } else if (textAlign === "right") {
    anchor = "end";
  }
  let lines = text.split("\n").map((t, i) => {
    return (
      <tspan
        x="0"
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
