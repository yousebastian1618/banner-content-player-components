const t=window.contentplayer.h;import{a as e}from"./chunk-1fc3cad0.js";var i;!function(t){t[t.STOP=0]="STOP",t[t.PLAYING=1]="PLAYING"}(i||(i={}));class a{constructor(){this.videoObject={top:100,left:0,width:100,height:100,zIndex:1,src:"http://media.w3.org/2010/05/sintel/trailer.webm"},this.originX="top",this.originY="left",this.angle=0,this.scaleX=1,this.scaleY=1,this.alreadyEnded=!0,this.playState=i.STOP,this.play=(()=>{let t=this.el.querySelector("video");t&&this.playState===i.STOP&&(this.playState=i.PLAYING,t.addEventListener("ended",this.ended),t.play())}),this.ended=(()=>{let t=this.el.querySelector("video");if(this.playState===i.PLAYING){this.playState=i.STOP,t.removeEventListener("ended",this.ended);let e=new Event("VIDEO_CONTENT_ENDED");window.dispatchEvent(e)}})}init(t){try{Object.assign(this,Object.assign({},t))}catch(t){console.log(t.message)}}changeStyle(t){try{Object.assign(this,Object.assign({},t))}catch(t){console.log(t.message)}}checkSlideState(t,a){if(a===e.SHOW&&t===e.START_ANIMATION&&(this.el.querySelector("video").currentTime=0,this.play()),a!==t)switch(t){case e.SHOW:this.play();break;case e.HIDE:this.playState=i.STOP,this.el.querySelector("video").currentTime=0,this.el.querySelector("video").removeEventListener("ended",this.ended)}}componentWillLoad(){this.init(this.videoObject),this.changeStyle(this.adjustment)}componentDidLoad(){}componentDidUpdate(){}render(){return this.src?t("div",{class:"video-wrapper",style:{top:`${this.top/this.containerHeight*100}%`,left:`${this.left/this.containerWidth*100}%`,width:this.adjustment.width,height:this.adjustment.height,transform:`rotate(${this.angle}deg)`,"transform-origin":`${this.originX} ${this.originY}`,zIndex:`${this.zIndex}`}},t("div",{class:"video-helper"},t("video",{src:this.src,autoplay:this.autoplay,loop:this.loop,muted:!0}))):null}static get is(){return"video-tag"}static get properties(){return{adjustment:{type:"Any",attr:"adjustment",watchCallbacks:["changeStyle"]},angle:{type:Number,attr:"angle",mutable:!0},autoplay:{type:Boolean,attr:"autoplay",mutable:!0},containerHeight:{type:Number,attr:"container-height",mutable:!0},containerWidth:{type:Number,attr:"container-width",mutable:!0},el:{elementRef:!0},height:{type:Number,attr:"height",mutable:!0},left:{type:Number,attr:"left",mutable:!0},loop:{type:Boolean,attr:"loop",mutable:!0},originX:{type:String,attr:"origin-x",mutable:!0},originY:{type:String,attr:"origin-y",mutable:!0},scaleX:{type:Number,attr:"scale-x",mutable:!0},scaleY:{type:Number,attr:"scale-y",mutable:!0},slideState:{type:Number,attr:"slide-state",mutable:!0,watchCallbacks:["checkSlideState"]},src:{type:String,attr:"src",mutable:!0},top:{type:Number,attr:"top",mutable:!0},videoObject:{type:"Any",attr:"video-object",watchCallbacks:["init"]},width:{type:Number,attr:"width",mutable:!0},zIndex:{type:Number,attr:"z-index",mutable:!0}}}static get style(){return"video-tag div.video-wrapper{display:block;position:absolute;background-color:#1e1e1e}video-tag div.video-wrapper .video-helper{position:relative;height:100%;padding-left:100%}video-tag .video-helper video{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:fill;object-fit:fill}"}}export{a as VideoTag};