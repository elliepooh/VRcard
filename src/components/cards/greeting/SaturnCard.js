import * as THREE from 'three';
import Three from './Three';

import Saturn from './obj/saturn';

/* eslint-disable no-param-reassign */
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
    this.saturn = new Saturn();
    this.three.scene.add(this.saturn.group);

    const colors = [0x37BE95, 0xF3F3F3, 0x6549C0];

    this.particles = new THREE.Group();
    this.three.scene.add(this.particles);
    const geometry = new THREE.TetrahedronGeometry(5, 0);

    for (let i = 0; i < 500; i += 1) {
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        shading: THREE.FlatShading,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 1000,
                        (Math.random() - 0.5) * 1000,
                        (Math.random() - 0.5) * 1000);
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      this.particles.add(mesh);
    }
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.particles.rotation.x += 0.001;
    this.particles.rotation.y -= 0.004;
    this.saturn.group.rotation.y += 0.003;

    this.three.render();
  }
}
