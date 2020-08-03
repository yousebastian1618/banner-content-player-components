import SlideState from "./slide-state";
import velocity from "velocity-animate";
import TextAnimationManager from "./text-animation";
function checkSlideState(slideState, ele, baseText, data) {
    let { Animation } = data;
    switch (slideState) {
        case SlideState.START_ANIMATION:
            ele.setAttribute("animation-stop", "true");
            velocity(ele, "finish");
            TextAnimationManager.initAnimation(Animation, ele);
            break;
        case SlideState.INIT:
            TextAnimationManager.initAnimation(Animation, ele);
            break;
        case SlideState.SHOW:
            if (ele.getAttribute("animation-stop") === "false") {
                ele.setAttribute("animation-stop", "true");
                velocity(ele, "finish");
                setTimeout(() => {
                    ele.setAttribute("animation-stop", "false");
                    TextAnimationManager.addAnimation(Animation, ele);
                }, 50);
            }
            else {
                ele.setAttribute("animation-stop", "false");
                TextAnimationManager.addAnimation(Animation, ele);
            }
            break;
        case SlideState.HIDE:
            ele.setAttribute("animation-stop", "true");
            velocity(ele, "finish").then(() => {
                let top = `${(baseText.top / baseText.containerHeight) * 100}%`;
                let left = `${(baseText.left / baseText.containerWidth) * 100}%`;
                console.log(top, left);
            });
            break;
    }
}
export default checkSlideState;
