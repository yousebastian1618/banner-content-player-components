function getXAdjustment(baseText) {
    const { fontSize, fontFamily } = baseText;
    let adj = 0;
    if (fontFamily === 'Georgia') {
        if (fontSize <= 65) {
            adj = .3;
        }
        else {
            adj = .4;
        }
    }
    else if (fontFamily === 'Damion') {
        if (fontSize > 55) {
            adj = .2;
        }
    }
    else if (fontFamily === 'Permanent Marker') {
        if (fontSize < 70) {
            adj = .1;
        }
        else {
            adj = .2;
        }
    }
    else if (fontFamily === 'Timmana') {
        if (fontSize < 50) {
            adj = .1;
        }
        else {
            adj = .2;
        }
    }
    else if (fontFamily === 'Contrail One') {
        if (fontSize > 50) {
            adj = .2;
        }
    }
    else if (fontFamily === 'Times New Roman' || fontFamily === 'Baloo' || fontFamily === 'Fredoka One' || fontFamily === 'Keania One' || fontFamily === 'Galada') {
        adj = .3;
    }
    else if (fontFamily === 'Montserrat Alternates' || fontFamily === 'Bowlby One' || fontFamily === 'Bevan' || fontFamily === 'Chango' || fontFamily === 'Paytone One' || fontFamily === "Sree Krushnadevaraya" || fontFamily === 'Alike' || fontFamily === 'Quando' || fontFamily === 'Seymour One' || fontFamily === 'Gidugu' || fontFamily === 'thin') {
        adj = 0;
    }
    else if (fontFamily === 'Verdana' || fontFamily === 'Lalezar' || fontFamily === 'Bowlby One SC' || fontFamily === 'Khand') {
        adj = .2;
    }
    else if (fontFamily === 'Mada' || fontFamily === 'Hind Madurai') {
        adj = .1;
    }
    return adj;
}
export { getXAdjustment };
