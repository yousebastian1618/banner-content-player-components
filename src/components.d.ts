/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface ClockTag {
    'angle': number;
    'clockObject': any;
    'containerHeight': number;
    'containerWidth': number;
    'customMask': string;
    'fill': string;
    'fontFamily': string;
    'fontSize': number;
    'fontStyle': string;
    'fontWeight': string;
    'height': number;
    'left': number;
    'lineHeight': number;
    'originX': string;
    'originY': string;
    'scaleX': number;
    'scaleY': number;
    'slideState': number;
    'stroke': string;
    'strokeLineCap': string;
    'strokeLineJoin': string;
    'strokeWidth': number;
    'textAlign': string;
    'top': number;
    'width': number;
    'zIndex': number;
  }
  interface ClockTagAttributes extends StencilHTMLAttributes {
    'angle'?: number;
    'clockObject'?: any;
    'containerHeight'?: number;
    'containerWidth'?: number;
    'customMask'?: string;
    'fill'?: string;
    'fontFamily'?: string;
    'fontSize'?: number;
    'fontStyle'?: string;
    'fontWeight'?: string;
    'height'?: number;
    'left'?: number;
    'lineHeight'?: number;
    'originX'?: string;
    'originY'?: string;
    'scaleX'?: number;
    'scaleY'?: number;
    'slideState'?: number;
    'stroke'?: string;
    'strokeLineCap'?: string;
    'strokeLineJoin'?: string;
    'strokeWidth'?: number;
    'textAlign'?: string;
    'top'?: number;
    'width'?: number;
    'zIndex'?: number;
  }

  interface ContentPlayerTag {
    'currentContentId': string;
    'slides': any;
  }
  interface ContentPlayerTagAttributes extends StencilHTMLAttributes {
    'currentContentId'?: string;
    'slides'?: any;
  }

  interface ContentSlideTag {
    'animationEnd': boolean;
    'content': any;
    'contentSlideObject': any;
    'opacity': number;
    'visible': boolean;
  }
  interface ContentSlideTagAttributes extends StencilHTMLAttributes {
    'animationEnd'?: boolean;
    'content'?: any;
    'contentSlideObject'?: any;
    'opacity'?: number;
    'visible'?: boolean;
  }

  interface CustomContentTag {
    'adjustment': any;
    'data': any;
  }
  interface CustomContentTagAttributes extends StencilHTMLAttributes {
    'adjustment'?: any;
    'data'?: any;
  }

  interface LoadingContentTag {
    'containerHeight': number;
    'containerWidth': number;
    'current': number;
    'progress': number;
    'state': string;
    'total': number;
    'visible': boolean;
  }
  interface LoadingContentTagAttributes extends StencilHTMLAttributes {
    'containerHeight'?: number;
    'containerWidth'?: number;
    'current'?: number;
    'progress'?: number;
    'state'?: string;
    'total'?: number;
    'visible'?: boolean;
  }

  interface ProgressBarTag {
    'baseColor': string;
    'containerWidth': number;
    'progress': number;
    'secondaryColor': string;
    'visible': boolean;
  }
  interface ProgressBarTagAttributes extends StencilHTMLAttributes {
    'baseColor'?: string;
    'containerWidth'?: number;
    'progress'?: number;
    'secondaryColor'?: string;
    'visible'?: boolean;
  }

  interface TextTag {
    'angle': number;
    'containerHeight': number;
    'containerWidth': number;
    'fill': string;
    'fontFamily': string;
    'fontSize': number;
    'fontStyle': string;
    'fontWeight': string;
    'height': number;
    'left': number;
    'lineHeight': number;
    'originX': string;
    'originY': string;
    'scaleX': number;
    'scaleY': number;
    'slideState': number;
    'stroke': string;
    'strokeLineCap': string;
    'strokeLineJoin': string;
    'strokeWidth': number;
    'text': string;
    'textAlign': string;
    'textObject': any;
    'top': number;
    'width': number;
    'zIndex': number;
  }
  interface TextTagAttributes extends StencilHTMLAttributes {
    'angle'?: number;
    'containerHeight'?: number;
    'containerWidth'?: number;
    'fill'?: string;
    'fontFamily'?: string;
    'fontSize'?: number;
    'fontStyle'?: string;
    'fontWeight'?: string;
    'height'?: number;
    'left'?: number;
    'lineHeight'?: number;
    'originX'?: string;
    'originY'?: string;
    'scaleX'?: number;
    'scaleY'?: number;
    'slideState'?: number;
    'stroke'?: string;
    'strokeLineCap'?: string;
    'strokeLineJoin'?: string;
    'strokeWidth'?: number;
    'text'?: string;
    'textAlign'?: string;
    'textObject'?: any;
    'top'?: number;
    'width'?: number;
    'zIndex'?: number;
  }

  interface VideoTag {
    'adjustment': any;
    'angle': number;
    'autoplay': boolean;
    'containerHeight': number;
    'containerWidth': number;
    'height': number;
    'left': number;
    'loop': boolean;
    'originX': string;
    'originY': string;
    'scaleX': number;
    'scaleY': number;
    'slideState': number;
    'src': string;
    'top': number;
    'videoObject': any;
    'width': number;
    'zIndex': number;
  }
  interface VideoTagAttributes extends StencilHTMLAttributes {
    'adjustment'?: any;
    'angle'?: number;
    'autoplay'?: boolean;
    'containerHeight'?: number;
    'containerWidth'?: number;
    'height'?: number;
    'left'?: number;
    'loop'?: boolean;
    'originX'?: string;
    'originY'?: string;
    'scaleX'?: number;
    'scaleY'?: number;
    'slideState'?: number;
    'src'?: string;
    'top'?: number;
    'videoObject'?: any;
    'width'?: number;
    'zIndex'?: number;
  }

  interface WeatherTag {
    'angle': number;
    'containerHeight': number;
    'containerWidth': number;
    'fill': string;
    'fontFamily': string;
    'fontSize': number;
    'fontStyle': string;
    'fontWeight': string;
    'height': number;
    'latitude': number;
    'left': number;
    'lineHeight': number;
    'longitude': number;
    'originX': string;
    'originY': string;
    'scaleX': number;
    'scaleY': number;
    'slideState': number;
    'stroke': string;
    'strokeLineCap': string;
    'strokeLineJoin': string;
    'strokeWidth': number;
    'temperatureType': string;
    'temperatureUnit': string;
    'textAlign': string;
    'top': number;
    'weatherObject': any;
    'width': number;
    'zIndex': number;
  }
  interface WeatherTagAttributes extends StencilHTMLAttributes {
    'angle'?: number;
    'containerHeight'?: number;
    'containerWidth'?: number;
    'fill'?: string;
    'fontFamily'?: string;
    'fontSize'?: number;
    'fontStyle'?: string;
    'fontWeight'?: string;
    'height'?: number;
    'latitude'?: number;
    'left'?: number;
    'lineHeight'?: number;
    'longitude'?: number;
    'originX'?: string;
    'originY'?: string;
    'scaleX'?: number;
    'scaleY'?: number;
    'slideState'?: number;
    'stroke'?: string;
    'strokeLineCap'?: string;
    'strokeLineJoin'?: string;
    'strokeWidth'?: number;
    'temperatureType'?: string;
    'temperatureUnit'?: string;
    'textAlign'?: string;
    'top'?: number;
    'weatherObject'?: any;
    'width'?: number;
    'zIndex'?: number;
  }
}

declare global {
  interface StencilElementInterfaces {
    'ClockTag': Components.ClockTag;
    'ContentPlayerTag': Components.ContentPlayerTag;
    'ContentSlideTag': Components.ContentSlideTag;
    'CustomContentTag': Components.CustomContentTag;
    'LoadingContentTag': Components.LoadingContentTag;
    'ProgressBarTag': Components.ProgressBarTag;
    'TextTag': Components.TextTag;
    'VideoTag': Components.VideoTag;
    'WeatherTag': Components.WeatherTag;
  }

  interface StencilIntrinsicElements {
    'clock-tag': Components.ClockTagAttributes;
    'content-player-tag': Components.ContentPlayerTagAttributes;
    'content-slide-tag': Components.ContentSlideTagAttributes;
    'custom-content-tag': Components.CustomContentTagAttributes;
    'loading-content-tag': Components.LoadingContentTagAttributes;
    'progress-bar-tag': Components.ProgressBarTagAttributes;
    'text-tag': Components.TextTagAttributes;
    'video-tag': Components.VideoTagAttributes;
    'weather-tag': Components.WeatherTagAttributes;
  }


  interface HTMLClockTagElement extends Components.ClockTag, HTMLStencilElement {}
  var HTMLClockTagElement: {
    prototype: HTMLClockTagElement;
    new (): HTMLClockTagElement;
  };

  interface HTMLContentPlayerTagElement extends Components.ContentPlayerTag, HTMLStencilElement {}
  var HTMLContentPlayerTagElement: {
    prototype: HTMLContentPlayerTagElement;
    new (): HTMLContentPlayerTagElement;
  };

  interface HTMLContentSlideTagElement extends Components.ContentSlideTag, HTMLStencilElement {}
  var HTMLContentSlideTagElement: {
    prototype: HTMLContentSlideTagElement;
    new (): HTMLContentSlideTagElement;
  };

  interface HTMLCustomContentTagElement extends Components.CustomContentTag, HTMLStencilElement {}
  var HTMLCustomContentTagElement: {
    prototype: HTMLCustomContentTagElement;
    new (): HTMLCustomContentTagElement;
  };

  interface HTMLLoadingContentTagElement extends Components.LoadingContentTag, HTMLStencilElement {}
  var HTMLLoadingContentTagElement: {
    prototype: HTMLLoadingContentTagElement;
    new (): HTMLLoadingContentTagElement;
  };

  interface HTMLProgressBarTagElement extends Components.ProgressBarTag, HTMLStencilElement {}
  var HTMLProgressBarTagElement: {
    prototype: HTMLProgressBarTagElement;
    new (): HTMLProgressBarTagElement;
  };

  interface HTMLTextTagElement extends Components.TextTag, HTMLStencilElement {}
  var HTMLTextTagElement: {
    prototype: HTMLTextTagElement;
    new (): HTMLTextTagElement;
  };

  interface HTMLVideoTagElement extends Components.VideoTag, HTMLStencilElement {}
  var HTMLVideoTagElement: {
    prototype: HTMLVideoTagElement;
    new (): HTMLVideoTagElement;
  };

  interface HTMLWeatherTagElement extends Components.WeatherTag, HTMLStencilElement {}
  var HTMLWeatherTagElement: {
    prototype: HTMLWeatherTagElement;
    new (): HTMLWeatherTagElement;
  };

  interface HTMLElementTagNameMap {
    'clock-tag': HTMLClockTagElement
    'content-player-tag': HTMLContentPlayerTagElement
    'content-slide-tag': HTMLContentSlideTagElement
    'custom-content-tag': HTMLCustomContentTagElement
    'loading-content-tag': HTMLLoadingContentTagElement
    'progress-bar-tag': HTMLProgressBarTagElement
    'text-tag': HTMLTextTagElement
    'video-tag': HTMLVideoTagElement
    'weather-tag': HTMLWeatherTagElement
  }

  interface ElementTagNameMap {
    'clock-tag': HTMLClockTagElement;
    'content-player-tag': HTMLContentPlayerTagElement;
    'content-slide-tag': HTMLContentSlideTagElement;
    'custom-content-tag': HTMLCustomContentTagElement;
    'loading-content-tag': HTMLLoadingContentTagElement;
    'progress-bar-tag': HTMLProgressBarTagElement;
    'text-tag': HTMLTextTagElement;
    'video-tag': HTMLVideoTagElement;
    'weather-tag': HTMLWeatherTagElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
