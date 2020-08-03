function renderMultiline({ text, lineHeight }) {
    let decimal = parseFloat(lineHeight) % 1;
    let lines = text.split("\n").map((t, i) => {
        return (h("tspan", { x: "0", dy: i === 0 ? `${decimal}em` : `${(parseFloat(lineHeight) + decimal)}em` }, t));
    });
    return lines;
}
export default renderMultiline;
