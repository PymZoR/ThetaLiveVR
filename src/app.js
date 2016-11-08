/**
 * Dependencies
 */

const THREE               = require('three');
const StereoEffect        = require('three-stereo-effect')(THREE);
const OrbitControls       = require('three-orbit-controls')(THREE);
const orientationControls = require('three.orientation');
const tv                  = require('./thetaView');

/**
 * Create a VR friendly view in a container, a
 * mjpeg stream URI and a canvas.
 * The canvas is needed to use the mjpeg as a
 * Three.js texture.
 */
class ThetaLiveVR {
    constructor(container, canvas, streamURI) {
        this.container = container;
        this.canvas    = canvas;
        this.ctx       = this.canvas.getContext('2d');

        this.img       = new Image();
        this.img.src   = streamURI;

        this.clock     = new THREE.Clock();
    }

    init() {
        this.renderer  = new THREE.WebGLRenderer();
        this.element   = this.renderer.domElement;
        this.container.appendChild(this.element);

        this.effect    = new StereoEffect(this.renderer);
        this.camera    = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
        this.camera.position.set(0, 10, 0);

        this.texture           = new THREE.Texture(this.canvas);
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.magFilter = THREE.LinearFilter;

        let material = new THREE.MeshBasicMaterial({
            map: this.texture,
            side: THREE.BackSide
        });
        let mesh   = new THREE.Mesh(tv.createGeometry(), material);
        this.scene = new THREE.Scene();
        this.scene.add(mesh);
        this.scene.add(this.camera);


        this.controls = new OrbitControls(this.camera, this.element);
        this.controls.target.set(
            this.camera.position.x + 0.1,
            this.camera.position.y,
            this.camera.position.z
        );
        this.controls.enableZoom = false;
        this.controls.enablePan  = false;

        let setOrientationControls = (e) => {
            if (!e.alpha) {
              return;
            }

            this.controls = orientationControls(this.camera);
            this.controls.connect();
            this.controls.update();

            this.element.addEventListener('click', () => this.fullscreen(), false);
            window.removeEventListener('deviceorientation', setOrientationControls, true);
        }

        window.addEventListener('deviceorientation', setOrientationControls, true);
        window.addEventListener('resize', () => this.resize, false);

        this.animate();
    }

    resize() {
        let width  = this.container.offsetWidth;
        let height = this.container.offsetHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.effect.setSize(width, height);
    }

    update(dt) {
        this.resize();
        this.camera.updateProjectionMatrix();
        this.controls.update(dt);
    }

    render() {
        this.effect.render(this.scene, this.camera);
    }

    animate() {
        this.update(this.clock.getDelta());
        this.updateCanvas();
        this.texture.needsUpdate = true;
        this.render();
        requestAnimationFrame(() => this.animate());
    }

    fullscreen() {
        if (this.container.requestFullscreen) {
            this.container.requestFullscreen();
        } else if (this.container.msRequestFullscreen) {
            this.container.msRequestFullscreen();
        } else if (this.container.mozRequestFullScreen) {
            this.container.mozRequestFullScreen();
        } else if (this.container.webkitRequestFullscreen) {
            this.container.webkitRequestFullscreen();
        }
    }

    updateCanvas() {
        this.ctx.drawImage(this.img, 0, 0);
    }
}

module.exports = ThetaLiveVR;
