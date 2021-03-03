import { BaseText } from "./base-text";

function getTextYAdjustment(baseText: BaseText){
    let adj = 0
    const font = baseText.fontFamily;
    const size = baseText.fontSize

    if(font === 'Tahoma'){
      adj = -.3
      if(size >= 21){
       adj+= ((size - 20) / 10) * -.325
      }
    }
    else if(font === 'Impact'){
      adj = -.3;
      if(size >= 21){
        adj+= ((size-20)/10) * -.25
      }
    }
    else if(font === 'Georgia'){
      adj = .2;
      if(size >= 21){
        adj = .2 - ((size-20)/10) * .06
      }
    }
    else if(font === 'Times New Roman'){
      adj = .2;
      if(size >= 21){
        adj = .2 + ((size-20)/10) * .085
      }
    }
    else if(font === 'Verdana'){
      if(size < 20){
        adj = -.2;
      }
      else if(size >= 21 && size <= 59){
        adj = -.8
      }
      else{
        adj = -.8 - ((size - 50)/10) * .3 
      }
    }
    else if(font === 'Galada'){
      if(size < 25){
        adj= -.3;
      }
      else if(size >= 25){
        adj = -.3 + ((size-20)/10) * -.3
      }
    }
    else if(font === 'Damion'){
      if(size < 25){
        adj= -.3;
      }
      else if(size >= 25){
        adj = -.3 + ((size-20)/10) * -.22
      }
    }
    else if(font === 'Permanent Marker'){
      if(size < 10){
        adj = 0
      }
      else if(size < 30){
        adj = -.8
      }
      else{
        adj = -.8 + ((size-30)/10) * -.55
      }
    }
    else if(font === 'Courgette'){
      adj = -.1;
      if(size > 10){
        adj += (size/10) * -.1
      }
    }
    else if(font === 'Baloo'){
      adj = -.4;
      if(size > 20){
        adj += ((size - 20)/10) * -.45
      }
    }
    else if(font === 'Fredoka One'){
      adj = -.2
      if(size > 20){
        adj += ((size - 20)/10) * -.2
      }
    }
    else if(font === 'Comfortaa'){
      adj = .3
      if(size > 30){
        adj = .5 + ((size-30)/10) * .1
      }
    }
    else if(font === 'Keania One'){
      adj = .3
      if(size > 20){
        adj = -.4 + ((size - 20)/10) * -.15
      }
    }
    else if(font === 'Timmana'){
      adj = .25
      if(size > 80){
        adj = .25 + ((size-80)/10) * .1
      }
    }
    else if(font === 'Contrail One'){
      adj = 0
      if(size > 50){
        adj = ((size-50)/10) * -.2
      }
    }
    else if(font === 'Khand'){
        adj = (size/10) * -.3
    }
    else if(font === 'Seymour One'){
      adj = -.2;
      if(size > 20){
        adj = -.2 + ((size - 20)/10) * -.15
      }
    }
    else if(font === 'Gidugu'){
      adj = -.2;
      if(size > 10){
        adj = -.5 + ((size - 10)/10) * -.5
      }
    }
    else if(font === 'Lalezar'){
      adj = 0;
      if(size > 30){
        adj = -.2 + ((size - 30)/10) * -.2
      }
    }
    else if(font === 'Bowlby One SC'){
      if(size < 40){
        adj = (size/10) * -.2
      }
      else if(size < 70){
        adj = -1 + ((size - 40)/10) * -.3
      }
      else{
        adj = -3 + ((size-70)/ 10) * -.4
      }
    }
    else if (font === 'Hind Madurai'){
      adj = (size/10) * -.17
    }
    else if(font === 'thin'){
      if(size < 15){
        adj = 1.2
      }
      else if(size < 25){
        adj = 1.7
      }
      else if(size < 40){
        adj = 3
      }
      else{
        adj = 3.3 + ((size-40)/ 10)
      }
    }
    else if(font === 'Montserrat Alternates'){
      adj = (size/10) * -.125
    }
    else if(font === 'Mada'){
      if(size > 50){
        adj = .75
      }
      else{
        adj = (size/10) * .1
      }
    }
    else if(font === 'Quando' || font === 'Alike'){
      adj = (size/10) * - .15
    }
    else if(font === 'Sree Krushnadevaraya'){
      adj = (size/10) * -1.35
    }
    else if(font === 'Paytone One'){
      adj = .2
      if(size > 10){
        adj = (size/10) * -.4
      }
    }
    else if(font === 'Chango'){
        adj = (size/10) * -.2
    }
    else if(font === 'Bevan'){
      adj = (size/10) * -.52
    }
    else if(font === "Bowlby One"){
      if(size < 11){
        adj = -.2
      }
      else if(size < 40){
        adj = -.8
      }
      else {
        adj = -1.6 + ((size-40)/10) * -.4
      }
    }
    return adj
}

export {getTextYAdjustment}