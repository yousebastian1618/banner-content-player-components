import velocity from 'velocity-animate';

let stopAnimation;

function dontMove(element){
    return velocity(element, {
        top: [`${element.initTop}`, `${element.initTop}`], 
        left:[`${element.initLeft}`, `${element.initLeft}`], 
        opacity: [1, 1]
    }, {duration: 0, easing: 'linear'})
}

function appearSlideUpInit(element){
    return velocity(element, { top: '100%', opacity: 0}, {duration: 0});
}

function appearSlideUp(element, delay, duration){
    return velocity(element, {
        top: [`${element.initTop}`, '100%'], 
        left:[`${element.initLeft}`, `${element.initLeft}`], 
        opacity: [1, 1]
    }, {duration: duration, delay: delay, easing: 'easeInCubic'})
}

function appearSlideDownInit(element){
    return velocity(element, { top: `-${element.offsetHeight}px`, opacity: 0}, {duration: 0});
}

function appearSlideDown(element, delay, duration){
    return velocity(element, {
        top: [`${element.initTop}`, `-${element.offsetHeight}px`], 
        left:[`${element.initLeft}`, `${element.initLeft}`], 
        opacity: [1, 1]
    },  {delay: delay, duration: duration, easing: 'easeInCubic'});
}

function appearSlideRightInit(element){
    return velocity(element, { left: `-${element.offsetWidth}px`, opacity: 0}, {duration: 0});
}

function appearSlideRight(element, delay, duration){
    return velocity(element, {
        top:[`${element.initTop}`, `${element.initTop}`], 
        left: [`${element.initLeft}`, `-${element.offsetWidth}px`], 
        opacity: [1, 1]
    }, {delay: delay, duration: duration, easing: 'easeInCubic'});
}

function appearSlideLeftInit(element){
    return velocity(element, { left: '100%', opacity: 0}, {duration: 0});
}

function appearSlideLeft(element, delay, duration){
    return velocity(element, {
        top:[`${element.initTop}`, `${element.initTop}`], 
        left: [`${element.initLeft}`, '100%'], 
        opacity: [1, 1]
    }, {delay: delay, duration: duration, easing: 'easeInCubic'});
}

function disappearSlideDown(element, delay, duration){
    return velocity(element, { 
        top: ['105%', `${element.initTop}`], 
        opacity: [1, 1]
    }, {duration: duration, delay: delay, easing: 'easeOutCubic'});
}

function disappearSlideUp(element, delay, duration){
    return velocity(element, { 
        top: [`-${(element.parentElement.offsetHeight * 0.05) + element.offsetHeight}px`, `${element.initTop}`], 
        opacity: [1, 1]
    }, {duration: duration, delay: delay, easing: 'easeOutCubic'});
}

function disappearSlideRight(element, delay, duration){
    return velocity(element, { 
        left: ['105%', `${element.initLeft}`], 
        opacity: [1, 1]
    }, {duration: duration, delay: delay, easing: 'easeOutCubic'});
}

function disappearSlideLeft(element, delay, duration){
    return velocity(element, { 
        left: [`-${element.offsetWidth}px`, `${element.initLeft}`], 
        opacity: [1, 1]
    }, {duration: duration, delay: delay, easing: 'easeOutCubic'});
}

function infiniteSlideRightInit(element){
    return velocity(element, { 
        left: '0%', 
        translateX: '-100%' 
    }, {duration: 0});
}

function infiniteSlideRight(element, delay, duration, firstTime){
    if(element.getAttribute("animation-stop") === 'false'){
        return velocity(element, {
            left: ['100%', '0%'], 
            translateX: ['0%', '-100%']
        }, {duration: [duration,0], delay: firstTime ? delay : 0, easing: 'linear'})
        .then(()=>{ 
            return infiniteSlideRight(element, delay, duration, false)
        });
    }
    return new Promise((resolve)=>{resolve();})
}

function infiniteSlideLeftInit(element){
    return velocity(element, {left: '100%', translateX: '0%'}, {duration: 0});
}

function infiniteSlideLeft(element, delay, duration, firstTime){
    if(element.getAttribute("animation-stop") === 'false'){
        return velocity(element, { 
            left: ['0%', '100%'], 
            translateX: ['-100%', '0%']
        }, {duration: [duration, 0], delay: firstTime ? delay : 0, easing: 'linear'})
        .then(()=>{ 
            return infiniteSlideLeft(element, delay, duration, false)
        });
    }
    return new Promise((resolve)=>{resolve();})
}

function InitAppearAnimation(element, {name}){
    switch(name){
        case 'Slide Up':
            return appearSlideUpInit(element);
        case 'Slide Down':
            return appearSlideDownInit(element);
        case 'Slide Right':
            return appearSlideRightInit(element);
        case 'Slide Left':
            return appearSlideLeftInit(element);
        case 'Infinite Slide Right':
            return infiniteSlideRightInit(element);
        case 'Infinite Slide Left':
            return infiniteSlideLeftInit(element);
    }
}

function InitDisappearAnimation(element, {name}){
    let animations = ['Slide Up', 'Slide Down','Slide Right', 'Slide Left'];
    if(animations.indexOf(name) >= 0){
        return velocity(element, {
            top: [`${element.initTop}`, `${element.initTop}`], 
            left:[`${element.initLeft}`, `${element.initLeft}`], 
            opacity: [1, 1]
        }, {duration: 0, easing: 'linear'})
    }
}

function getAppearAnimation(element, {name, startTime, duration}){
    switch(name){
        case 'Slide Up':
            return appearSlideUp(element, startTime * 1000, duration);
        case 'Slide Down':
            return appearSlideDown(element, startTime * 1000, duration);
        case 'Slide Right':
            return appearSlideRight(element, startTime * 1000, duration);
        case 'Slide Left':
            return appearSlideLeft(element, startTime * 1000, duration);
        case 'Infinite Slide Right':
            return infiniteSlideRight(element, startTime * 1000, duration, true);
        case 'Infinite Slide Left':
            return infiniteSlideLeft(element, startTime * 1000, duration, true);
        default:
            return dontMove(element);
    }
}

function getDisappearAnimation(element, {name, startTime, duration}, Appear){
    switch(name){
        case 'Slide Up':
            return disappearSlideUp(element, (startTime - Appear.startTime) * 1000, duration);
        case 'Slide Down':
            return disappearSlideDown(element, (startTime - Appear.startTime) * 1000, duration);
        case 'Slide Right':
            return disappearSlideRight(element, (startTime - Appear.startTime) * 1000, duration);
        case 'Slide Left':
            return disappearSlideLeft(element, (startTime - Appear.startTime) * 1000, duration);
        default:
            return new Promise((resolve)=>{ resolve(); });
    }
}

function initAnimation(Animation, element){
    if(!element.initTop){
        element.initTop = element.style.top;
    }
    if(!element.initLeft){
        element.initLeft = element.style.left;
    }
    if(Animation){
        if(Animation.Appear){
            return InitAppearAnimation(element, Animation.Appear);
        }
        else if(Animation.Disappear){
            return InitDisappearAnimation(element, Animation.Disappear);
        }
    }
}

function addAnimation(Animation, element){
    if(Animation){
        let {Appear, Disappear} = Animation;
        if(Appear && Disappear){
            return initAnimation(Animation, element)
            .then(()=>{
                return getAppearAnimation(element, Appear)
            })
            .then(()=>{
                if(Disappear){
                    return getDisappearAnimation(element, Disappear, Appear)
                }
            });
        }
        else if(Appear && Disappear === undefined){
            return initAnimation(Animation, element)
            .then(()=>{
                return getAppearAnimation(element, Appear);
            })
        }
        else if(Appear === undefined && Disappear){
            Appear = {startTime:0};
            return initAnimation(Animation, element)
            .then(()=>{
                return getDisappearAnimation(element, Disappear, Appear)
            })
        }
    }
}

const TextAnimationManager = {
    initAnimation: initAnimation,
    addAnimation: addAnimation,
    set stopAnimation(value){
        stopAnimation = value;
    },
    get stopAnimation(){
        return stopAnimation;
    }
}

export default TextAnimationManager;