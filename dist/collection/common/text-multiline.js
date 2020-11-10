function renderMultiline({ text, lineHeight, textAlign, fontSize }) {
    let decimal = parseFloat(lineHeight) % 1;
    let anchor = "start";
    if (textAlign === "center") {
        anchor = "middle";
    }
    else if (textAlign === "right") {
        anchor = "end";
    }
    let lines = text.split("\n").map((t, i) => {
        return (h("tspan", { x: "0", dy: i === 0 ? `${decimal}em` : `${parseFloat(lineHeight) + decimal}em`, "text-anchor": anchor }, t));
    });
    return lines;
}
export default renderMultiline;
