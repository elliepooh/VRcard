import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

/* eslint-disable no-param-reassign */
export default class Three {
  constructor({
    container = null,
    transparent = false,
    alpha = 1.0,
    color = 0xffffff,
    cameraPositionX = 0,
    cameraPositionY = 0,
    cameraPositionZ = 500,
  }) {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.container = container;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.transparent = transparent;
    this.alpha = alpha;
    this.color = color;
    this.cameraPositionX = cameraPositionX;
    this.cameraPositionY = cameraPositionY;
    this.cameraPositionZ = cameraPositionZ;
  }
  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.position.set(this.cameraPositionX, this.cameraPositionY, this.cameraPositionZ);
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({ alpha: this.transparent, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener('resize', this.onResize.bind(this));
  }
  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
