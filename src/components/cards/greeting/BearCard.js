import * as THREE from 'three';
import bearModel from '@/assets/models/bear.json';

import Three from './Three';

export default class SaturnCard {
  constructor(container) {
    this.three = new Three({
      container,
      color: 0x0E2255,
    });

    this.init();
  }
  init() {
    this.three.init();

    this.addLights();
    this.draw();
  }
  addLights() {
    const ambientLight = new THREE.AmbientLight();
    this.three.scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(200, 100, 200);
    light.castShadow = true;
    light.shadow.camera.left = -100;
    light.shadow.camera.right = 100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this.three.scene.add(light);
  }
  draw() {
    const loader = new THREE.JSONLoader();
    loader.load(bearModel, (geometry, materials) => {
      this.bear = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
      this.three.scene.add(this.bear);
    });
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.three.render();
  }
}
