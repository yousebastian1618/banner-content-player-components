import { h } from '../contentplayer.core.js';

var SlideState;
(function (SlideState) {
    SlideState[SlideState["INIT"] = 0] = "INIT";
    SlideState[SlideState["WAIT_ANIMATION"] = 1] = "WAIT_ANIMATION";
    SlideState[SlideState["START_ANIMATION"] = 2] = "START_ANIMATION";
    SlideState[SlideState["SHOW"] = 3] = "SHOW";
    SlideState[SlideState["TRANSITION"] = 4] = "TRANSITION";
    SlideState[SlideState["HIDE"] = 5] = "HIDE";
})(SlideState || (SlideState = {}));
var SlideState$1 = SlideState;

export { SlideState$1 as a };
