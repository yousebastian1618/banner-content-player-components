function renderMultiline({text, lineHeight}: any){
    let decimal = parseFloat(lineHeight) % 1;
    let lines = text.split("\n").map((t, i)=>{
        return (<tspan x="0" dy={i === 0 ? `${decimal}em` : `${(parseFloat(lineHeight)+decimal)}em`}>{t}</tspan>)
    })
    return lines;
}

export default renderMultiline;