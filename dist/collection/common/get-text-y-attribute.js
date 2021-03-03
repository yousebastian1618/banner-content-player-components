function getTextYAdjustment(baseText) {
    let adj = 0;
    const f = baseText.fontSize;
    if (baseText.fontFamily === 'Tahoma') {
        adj = -.3;
        if (f >= 21) {
            adj += ((f - 20) / 10) * -.325;
        }
    }
    else if (baseText.fontFamily === 'Impact') {
        adj = -.3;
        if (f >= 21) {
            adj += ((f - 20) / 10) * -.25;
        }
    }
    else if (baseText.fontFamily === 'Georgia') {
        adj = .2;
        if (f >= 21) {
            adj = .2 - ((f - 20) / 10) * .06;
        }
    }
    else if (baseText.fontFamily === 'Times New Roman') {
        adj = .2;
        if (f >= 21) {
            adj = .2 + ((f - 20) / 10) * .085;
        }
    }
    else if (baseText.fontFamily === 'Verdana') {
        if (f < 20) {
            adj = -.2;
        }
        else if (f >= 21 && f <= 59) {
            adj = -.8;
        }
        else {
            adj = -.8 - ((f - 50) / 10) * .3;
        }
    }
    else if (baseText.fontFamily === 'Galada') {
        if (f < 25) {
            adj = -.3;
        }
        else if (f > -25) {
            adj = -.3 + ((f - 20) / 10) * -.3;
        }
    }
    else if (baseText.fontFamily === 'Damion') {
        if (f < 25) {
            adj = -.3;
        }
        else if (f > -25) {
            adj = -.3 + ((f - 20) / 10) * -.22;
        }
    }
    else if (baseText.fontFamily === 'Permanent Marker') {
        if (f < 10) {
            adj = 0;
        }
        else if (f < 30) {
            adj = -.8;
        }
        else {
            adj = -.8 + ((f - 30) / 10) * -.55;
        }
    }
    else if (baseText.fontFamily === 'Courgette') {
        adj = -.1;
        if (f > 10) {
            adj += (f / 10) * -.1;
        }
    }
    else if (baseText.fontFamily === 'Baloo') {
        adj = -.4;
        if (f > 20) {
            adj += ((f - 20) / 10) * -.45;
        }
    }
    else if (baseText.fontFamily === 'Fredoka One') {
        adj = -.2;
        if (f > 20) {
            adj += ((f - 20) / 10) * -.2;
        }
    }
    else if (baseText.fontFamily === 'Comfortaa') {
        adj = .3;
        if (f > 30) {
            adj = .5 + ((f - 30) / 10) * .1;
        }
    }
    else if (baseText.fontFamily === 'Keania One') {
        adj = .3;
        if (f > 20) {
            adj = -.4 + ((f - 20) / 10) * -.15;
        }
    }
    else if (baseText.fontFamily === 'Timmana') {
        adj = .25;
        if (f > 80) {
            adj = .25 + ((f - 80) / 10) * .1;
        }
    }
    else if (baseText.fontFamily === 'Contrail One') {
        adj = 0;
        if (f > 50) {
            adj = ((f - 50) / 10) * -.2;
        }
    }
    else if (baseText.fontFamily === 'Khand') {
        adj = ((f) / 10) * -.3;
    }
    else if (baseText.fontFamily === 'Seymour One') {
        adj = -.2;
        if (f > 20) {
            adj = -.2 + ((f - 20) / 10) * -.15;
        }
    }
    else if (baseText.fontFamily === 'Gidugu') {
        adj = -.2;
        if (f > 10) {
            adj = -.5 + ((f - 10) / 10) * -.5;
        }
    }
    else if (baseText.fontFamily === 'Lalezar') {
        adj = 0;
        if (f > 30) {
            adj = -.2 + ((f - 30) / 10) * -.2;
        }
    }
    else if (baseText.fontFamily === 'Bowlby One SC') {
        if (f < 40) {
            adj = (f / 10) * -.2;
        }
        else if (f < 70) {
            adj = -1 + ((f - 40) / 10) * -.3;
        }
        else {
            adj = -3 + ((f - 70) / 10) * -.4;
        }
    }
    else if (baseText.fontFamily === 'Hind Madurai') {
        adj = (f / 10) * -.17;
    }
    else if (baseText.fontFamily === 'thin') {
        if (f < 15) {
            adj = 1.2;
        }
        else if (f < 25) {
            adj = 1.7;
        }
        else if (f < 40) {
            adj = 3;
        }
        else {
            adj = 3.3 + ((f - 40) / 10) * 1;
        }
    }
    else if (baseText.fontFamily === 'Montserrat Alternates') {
        adj = (f / 10) * -.125;
    }
    else if (baseText.fontFamily === 'Mada') {
        if (f > 50) {
            adj = .75;
        }
        else {
            adj = (f / 10) * .10;
        }
    }
    else if (baseText.fontFamily === 'Quando' || baseText.fontFamily === 'Alike') {
        adj = (f / 10) * -.15;
    }
    else if (baseText.fontFamily === 'Sree Krushnadevaraya') {
        adj = (f / 10) * -1.35;
    }
    else if (baseText.fontFamily === 'Paytone One') {
        adj = .2;
        if (f > 10) {
            adj = (f / 10) * -.4;
        }
    }
    else if (baseText.fontFamily === 'Chango') {
        adj = (f / 10) * -.2;
    }
    else if (baseText.fontFamily === 'Bevan') {
        adj = (f / 10) * -.52;
    }
    else if (baseText.fontFamily === "Bowlby One") {
        if (f < 11) {
            adj = -.2;
        }
        else if (f < 40) {
            adj = -.8;
        }
        else {
            adj = -1.6 + ((f - 40) / 10) * -.4;
        }
    }
    return adj;
}
export { getTextYAdjustment };
