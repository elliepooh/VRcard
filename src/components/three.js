import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

export default class Three {
  constructor({
    container = null,
    transparent = false,
    alpha = 1.0,
    color = 0xffffff,
  }) {
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.container = container;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.transparent = transparent;
    this.alpha = alpha;
    this.color = color;
  }
  init() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.lookAt(this.scene.position);
    this.camera.position.z = 100;

    this.renderer = new WebGLRenderer({ alpha: this.transparent });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(this.color, this.alpha);

    this.container.appendChild(this.renderer.domElement);

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
