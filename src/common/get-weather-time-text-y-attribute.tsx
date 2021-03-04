import { BaseText } from "./base-text";


const getYAdjustment = function(text: BaseText, containerHeight){
    const size = text.fontSize
    const font = text.fontFamily;

    let adj = 0;
    if(font === 'Arial'){
        if(size < 40){
            adj = 1 + (size/10) 
        }
        else if (size < 80){
            adj = 7 + ((size- 30)/10) 
        }
        else{
            adj = 12 + ((size - 70)/10) * 3
        }
    }
    else if(font === 'Impact'){
        if(size < 60){
            adj = 2.5 + ((size - 10)/10) * .5
        }
        else{
            adj = 6 + ((size - 60)/10) * .25
        }
    }
    else if(font === 'Georgia' || font === 'Times New Roman'){
        adj = 2.5 + ((size - 10)/10) * 1.4
    }
    else if(font === 'Tahoma'){
        if(size < 20){
          adj = 2.5
        }
        else if(size < 60){
            adj = 5;
        }
        else{
            adj = 5 + ((size-60)/10) 
        }
    }
    else if(font === 'Verdana'){
        adj = 2;
        if(size > 10){
            adj += ((size-10)/10) * .8
        }
    }
    else if(font === 'Galada'){
        adj = 1.5;
        if(size > 10){
            adj += ((size-10)/10) * .6
        }
    }
    else if(font === 'Damion'){
        adj = .5;
        if(size > 10){
            adj += ((size-10)/10) * .85
        }
    }
    else if(font === 'Courgette'){
        adj = 1;
        if(size > 10){
            adj += ((size-10)/10) * 1.25
        }
    }
    else if(font === 'Baloo'){
        if(size > 10){
            adj = ((size-10)/10) * .75
        }
    }
    else if(font === 'Fredoka One' || font === 'Chango' || font === 'Quando'){
        adj = size/10
    }
    else if(font === 'Comfortaa'){
        adj = ((size/10) * 2) -1
    }
    else if(font === 'Keania One'){
        adj = (size/10) * 1.1
    }
    else if(font === 'Russo One'){
        adj = (size/10) * 1.5
    }
    else if(font === 'Timmana'){
        adj = (size/10) * 1.8
    }
    else if(font === 'Contrail One'){
        adj = (size/10) * 1.3
    }
    else if(font === 'Khand'){
        adj = (size/10) * .45
    }
    else if(font === 'Seymour One'){
      adj = 2;
      if(size > 10){
        adj += ((size-10)/10) * .85
      }
    }
    else if(font === 'Gidugu'){
      if(size > 35){
        adj = (size)/10 * -.3
      }
    }
    else if(font === 'Lalezar'){
        adj = .5
        if(size > 10){
          adj += (size-10)/10 * 1.25
        }
    }
    else if(font === 'Bevan'){
        adj = (size/10) * -.25
    }
    else if(font === 'Sree Krushnadevaraya'){
        adj = -4
        if(size > 10){
            adj += (size-10)/10 * -3.2
        }
    }
    else if(font === 'Alike'){
        adj = 1
        if(size > 10){
            adj += (size-10)/10
        }
    }
    else if(font === 'Mada'){
        adj = 2;
        if(size > 10){
            adj = ((size-10) /10) * 1.75
        }
    }
    else if (font === 'Hind Madurai' || font === "Montserrat Alternates"){
        adj = (size/10) * 1.25
    }
    else if(font === "IM Fell DW Pica"){
        adj = 2;
        if(size > 10 && size < 80){
            adj = ((size-10) /10) * 2
        }
        else{
            adj = 10 + ((size-80) /10) * 3.5
        }
    }
    else if(font === "IM Fell English"){
        console.log('adj', adj)
        if(size <= 10){
            adj = 2;
        }
        else if(size > 10 && size < 80){
            adj = 2+ ((size-10)/10) * 1.5
        }
        else{
            adj = 12 + ((size-80)/10) * 2.5
        }
    }
    // The adjustment scales with the hieght of the player window. That was unknown till after
    // all measurements were taken on the preview window with a height of 255px. That's why below we
    // divide by 255 to get the adjustment per pixel, and then multiply by the player window height
    return (adj/255) * containerHeight;
  }

export {getYAdjustment}