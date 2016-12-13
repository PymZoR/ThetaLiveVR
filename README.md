# Theta live VR
[![dependencies Status](https://david-dm.org/PymZoR/ThetaLiveVR/status.svg)](https://david-dm.org/PymZoR/ThetaLiveVR) [![Build Status](https://travis-ci.org/PymZoR/ThetaLiveVR.svg)](https://travis-ci.org/PymZoR/ThetaLiveVR)  

Javascript package helping you create VR-friendly (Cardboard compatible !) 360° livestream
for the Ricoh Theta S.


![Example](https://thumbs.gfycat.com/VariableDampDutchsmoushond-size_restricted.gif)


## Usage
#### Including
Clone the project, and import the module in your app. ThetaLiveVR use [UMD](https://github.com/umdjs/umd), so you can use which method suits the better for your project.


#### Creating a ThetaLiveVR instance
You'll need a container which will render the view, a canvas to act as a texture and an URI to your motion-jpeg stream. How easy.
```js
let container = document.getElementById('container');
let canvas    = document.getElementById('canvas');
let streamURI = 'http://localhost:8080/stream.jpg';

let liveVR    = new ThetaLiveVR(container, canvas, 'test.jpg');
liveVR.init();
```

Full working example [here](example/index.html).  
**Note**: this example uses a proxy server to avoid CORS problems




## Contributing
As this project has been made for a school project, it may not suit your needs.
If you have any suggestion, please submit an issue or pull request.


## Resources
Useful links that helped me to build this project. Thanks to them !  
* [Create virtual reality panoramas with three.js](https://www.gadgetdaily.xyz/create-virtual-reality-panoramas-with-three-js/)  
* [Theta live streaming](https://github.com/ricohapi/video-streaming-sample-app)
