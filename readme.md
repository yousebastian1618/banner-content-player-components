# Content player components
This repo contains the code that renders componens like:
- text
- images
- video
- weather
- custom contents

for the web page and the LED player app.
The components were made using the [stenciljs](https://stenciljs.com/).
The code is written in TypeScript using tools like wenpack and babel for the Transpiling/Compiling.

# Requirements
- Node and npm in a newer version, we recomend to use **nvm** to manage different node versions.  

# Quick start
Once have your environment setup (if don't go to *Setting the environment*)
```
npm install
npm run build
```
This will **build** the component to pure javascrit that runs most of the browsers.

Just copy-paste the files and add the html tag to the page like this:

```html
<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <script src="/build/contentplayer.js"></script>
  </head>

  <body>
      <content-player-tag id="player"></content-player-tag>
  </body>
</html>
```

To debug/test your components you can 
```
npm start
```
This will open your browser with the content-player page.

# Setting the environment
- intsall scoop by running this in powershell
```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```
- install nvm & current node version
```powershell
scoop install nvm
nvm install <node_version>
nvm use <node_version>
#nvm install 12.14.1
#nvm use 12.14.1
```

# The json object

This app reads a json object with the definition of what is going to be play on the screen.
The json object is created by the front end in the banner prismview page, it contains the information about size, color, position, rotation, and if is custom content it has a `__data__` element with the contents inside the custom content with the **fabricjs** object format.
```javascript
let obj = {
  content: {
    __data__: {   //This part is in fabicjs object format
      background: "#fff",
      objects: [
        {
          angle: 0,
          backgroundColor: "",
          charSpacing: 0,
          clipTo: null,
          customData: {
            name: "Farenheit",
            position: "v",
            type: "weather",
            units: "c"
          },
          fill: "rgb(0,0,0)",
          fillRule: "nonzero",
          flipX: false,
          flipY: false,
          fontFamily: "Impact",
          fontSize: 40,
          fontStyle: "",
          fontWeight: "normal",
          globalCompositeOperation: "source-over",
          height: 45,
          left: 565,
          lineHeight: 1.16,
          opacity: 1,
          originX: "left",
          originY: "top",
          scaleX: 1,
          scaleY: 1,
          shadow: {
            affectStroke: false,
            blur: 0,
            color: "rgba(0,0,0,0)",
            offsetX: 0,
            offsetY: 0
          },
          skewX: 0,
          skewY: 0,
          stroke: null,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeLineJoin: "miter",
          strokeMiterLimit: 10,
          strokeWidth: 1,
          styles: {},
          text: "☼",
          textAlign: "left",
          textBackgroundColor: "",
          textDecoration: "",
          top: 193,
          transformMatrix: null,
          type: "weather",
          visible: false,
          width: 36,
          zIndex: 0
        },
        {
          Animation: {
            Appear: {
              duration: 1000,
              id: 0,
              name: "Slide Up",
              startTime: 2
            },
            Disappear: {
              duration: 1000,
              id: 0,
              name: "Slide Up",
              startTime: 5
            }
          },
          angle: 0,
          backgroundColor: "",
          charSpacing: 0,
          clipTo: null,
          customData: {
            name: "Farenheit",
            position: "v",
            type: "temperature",
            units: "c"
          },
          fill: "rgb(0,0,0)",
          fillRule: "nonzero",
          flipX: false,
          flipY: false,
          fontFamily: "Galada",
          fontSize: 40,
          fontStyle: "",
          fontWeight: "normal",
          globalCompositeOperation: "source-over",
          height: 45,
          left: 540,
          lineHeight: 1.16,
          opacity: 1,
          originX: "left",
          originY: "top",
          scaleX: 1,
          scaleY: 1,
          shadow: {
            affectStroke: false,
            blur: 0,
            color: "rgba(0,0,0,0)",
            offsetX: 0,
            offsetY: 0
          },
          skewX: 0,
          skewY: 0,
          stroke: null,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeLineJoin: "miter",
          strokeMiterLimit: 10,
          strokeWidth: 1,
          styles: {},
          text: "99 ºC",
          textAlign: "left",
          textBackgroundColor: "",
          textDecoration: "",
          top: 132,
          transformMatrix: null,
          type: "weather",
          visible: false,
          width: 80,
          zIndex: 2
        }
      ]
    },
    animation: "fade",
    company: 21,
    custom_duration: 10,
    duration: 10,
    extension: "json",
    folder: null,
    height: 540,
    id: 1410,
    index: 0,
    name: "weatherContent2",
    playlist_item_id: 1156,
    shared: false,
    size: null,
    thumbnail: "https://cms-banner-prod.s3.amazonaws.com/contents/company_21/6869594d-6f99-4d96-bf4b-e409073c3977_thumbnail.png",
    type: "customContent",
    updated_date: "2019-02-12T16:56:07.562396",
    uploaded_date: "2019-02-12T16:50:43.640585",
    url: "https://cms-banner-prod.s3.amazonaws.com/contents/company_21/6869594d-6f99-4d96-bf4b-e409073c3977.json",
    uuid: "6869594d-6f99-4d96-bf4b-e409073c3977",
    width: 960
  },
  visible: false,
  animationEnd: false
};
```

# Dispatching Events
This is the way to send instructions to the content player component, we have:
- *CONTENT_PLAYER_LOAD*: sends the contents to be loaded
- *CONTENT_PLAYER_CHANGED*: trigger when the content change
- *VIDEO_CONTENT_ENDED*: trigger when a video ended
- *CONTENT_STATUS*: sets the status of the content for example if the content is loading or playing.

```javascript
let contents = [];
contents.push({
  "content": obj,
  "visible": false,
  "animationEnd": false
})

LoadContents(contents);


function LoadContents(contents) {
  let event = new CustomEvent("CONTENT_PLAYER_LOAD", {
    detail: contents
  });
  window.dispatchEvent(event);
}
```
