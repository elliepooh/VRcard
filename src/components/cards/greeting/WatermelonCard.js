import * as THREE from 'three';
import Three from './Three';

import Watermelon from './obj/watermelon';

export default class WatermelonCard {
  constructor(container) {
    this.three = new Three({
      container,
      color: 0xD4F3F4,
      cameraPositionZ: 800,
    });
    this.width = container.clientWidth;
    this.height = container.clientHeight;

    this.init();

    container.addEventListener('mousemove', this.onMouseMove.bind(this));
    container.addEventListener('touchmove', this.onMouseMove.bind(this));
  }
  init() {
    this.three.init();

    this.drawMouse();
    this.addLights();
    this.draw();
  }
  drawMouse() {
    const mouseGeometry = new THREE.CircleGeometry(50);
    const mouseMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    });
    this.mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    this.mouse.position.set(0, 0, -5);
    this.three.scene.add(this.mouse);
  }
  addLights() {
    const ambientLight = new THREE.AmbientLight();
    this.three.scene.add(ambientLight);

    const light = new THREE.DirectionalLight();
    light.position.set(300, 200, 300);
    light.castShadow = true;
    this.three.scene.add(light);
  }
  draw() {
    this.watermelon = new Watermelon();
    // this.watermelon.group.position.set(-200, -100, 0);
    this.three.scene.add(this.watermelon.group);
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.watermelon.moveSeedsDown();

    this.three.render();
  }
  onMouseMove(event) {
    this.mouseX = ((event.clientX / this.width) * 2) - 1;
    this.mouseY = -((event.clientY / this.height) * 2) + 1;

    const vector = new THREE.Vector3(this.mouseX, this.mouseY, 1);
    vector.unproject(this.three.camera);
    const dir = vector.sub(this.three.camera.position).normalize();
    const distance = -this.three.camera.position.z / dir.z;
    const pos = this.three.camera.position.clone().add(dir.multiplyScalar(distance));
    this.mouse.position.copy(pos);

    this.watermelon.moveSeedsAway(pos);
  }
}