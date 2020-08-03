declare function initAnimation(Animation: any, element: any): any;
declare function addAnimation(Animation: any, element: any): any;
declare const TextAnimationManager: {
    initAnimation: typeof initAnimation;
    addAnimation: typeof addAnimation;
    stopAnimation: any;
};
export default TextAnimationManager;
