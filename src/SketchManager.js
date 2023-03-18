import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';

const OrbitController = OrbitControls(THREE);

export class SketchManager extends THREE.EventDispatcher {
  constructor(canvas, audioElement, customOptions = {}) {
    super();
    const options = {
      cameraNear: 0.1,
      cameraFar: 1000,
      ...customOptions,
    };
    this.frag = '';
    this.vert = '';

    this.startTime = Date.now();
    this.mouse = { x: 0, y: 0 };
    this.scene = {};
    this.camaera = {};
    this.renderer = {};
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      stencil: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor( 0xffffff );
    const dpr = Math.min(1.5, window.devicePixelRatio);
    this.renderer.setPixelRatio(dpr);
  
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.01, 200);
    this.camera.position.set(0, 1, -3);
    this.camera.lookAt(new THREE.Vector3());
  
    this.scene = new THREE.Scene();
    window.scene = this.scene;
  
    this.controls = new OrbitController(this.camera, this.renderer.domElement);
  }

  setup(canvas) {

    // // initial resize
    // this.resize();

    // // event listeners
    // window.addEventListener('resize', () => this.resize());

  }

  unmount() {}
  init() {}
  draw() {}
  render() {
    this.init();
    this.draw();
  }
  resize(width, height) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
  updateMousePosition(e) {
    const { height, width } = this.canvas;
    this.mouse = {
      x: e.clientX - width / 2,
      y: -e.clientY + height / 2,
    }
  }
  setCameraPos(x, y, z) {
    this.camera.position.set(x, y, z);
  }
  lookAt(x, y, z) {
    this.camera.lookAt(x, y, z);
  }
  setClearColor(hex) {
    this.renderer.setClearColor(hex);
  }
  disableOrbitControls() {
    this.controls.enabled = false;
  }
  getUTime() {
    const deltaTime = (Date.now() - this.startTime) / 1000.0;
    return deltaTime;
  }
}
