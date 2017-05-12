import * as THREE from 'three';
import Three from './Three';

import Fly from './obj/fly';
import DotSystem from './obj/dotSystem';

export default class FireflyCard {
  constructor(container) {
    this.three = new Three({
      container,
      color: 0x000A3D,
    });

    this.fireflies = [];
    this.jarFireflies = [];

    this.init();
  }
  init() {
    this.three.init();

    this.addLights();
    this.draw();
  }
  addLights() {
    const ambientLight = new THREE.HemisphereLight(0xA9B8FC);
    this.three.scene.add(ambientLight);

    const directLight = new THREE.DirectionalLight(0xE1FEA4, 0.5);
    directLight.castShadow = true;
    directLight.position.set(200, 200, 200);
    this.three.scene.add(directLight);

    const pointLight = new THREE.PointLight(0xFF007B, 0.4);
    pointLight.castShadow = true;
    pointLight.position.set(-100, 100, 100);
    this.three.scene.add(pointLight);
  }
  draw() {
    this.drawGround();
    this.drawDotSystem();
    this.drawJar();
    this.drawFireflies();
  }
  drawGround() {
    const geometry = new THREE.TetrahedronGeometry(200, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x0A9381,
      shading: THREE.FlatShading,
    });

    this.ground = new THREE.Mesh(geometry, material);
    this.ground.scale.set(3, 1, 2);
    this.ground.position.y = -305;
    this.ground.castShadow = true;
    this.ground.receiveShadow = true;
    this.three.scene.add(this.ground);
  }
  drawDotSystem() {
    this.dotSystem = new THREE.Group();
    this.three.scene.add(this.dotSystem);

    const system1 = new DotSystem({
      intensity: 3000,
      color: 0xE1FEA4,
      xSpread: 800,
      ySpread: 800,
      zSpread: 800,
    });
    this.dotSystem.add(system1.group);

    const system2 = new DotSystem({
      intensity: 100,
      color: 0xFF007B,
      xSpread: 300,
      ySpread: 500,
      zSpread: 400,
      size: 13,
    });
    system2.group.position.set(-100, -80, 0);
    this.dotSystem.add(system2.group);
  }
  drawJar() {
    this.jar = new THREE.Group();
    this.jar.position.set(-100, -10, 20);
    this.jar.rotation.z = 0.1;
    this.three.scene.add(this.jar);

    const jarGeometry = new THREE.CylinderGeometry(100, 110, 200, 10);
    const jarMaterial = new THREE.MeshPhongMaterial({
      color: 0xA9B8FC,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      shading: THREE.FlatShading,
    });

    const body = new THREE.Mesh(jarGeometry, jarMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    this.jar.add(body);

    const capGeometry = new THREE.CylinderGeometry(100, 100, 30, 10);
    const capMaterial = jarMaterial.clone();
    capMaterial.opacity = 0.8;
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.castShadow = true;
    cap.receiveShadow = true;
    cap.position.set(38, 110, 0);
    cap.rotation.z = 0.13;
    this.jar.add(cap);

    const bottomGeometry = new THREE.CylinderGeometry(110, 110, 20, 10);
    const bottom = new THREE.Mesh(bottomGeometry, jarMaterial);
    bottom.castShadow = true;
    bottom.receiveShadow = true;
    bottom.position.y = -110;
    this.jar.add(bottom);
  }
  drawFireflies() {
    const randSpread = pos => THREE.Math.randFloatSpread(pos);
    const rand = (min, max) => THREE.Math.randFloat(min, max);

    for (let i = 0; i < 4; i += 1) {
      const firefly = new Fly({
        light: true,
        bodyColor: 0x5363B2,
        wingColor: 0xA9B8FC,
        lightColor: 0x00FFA5,
      });
      firefly.group.position.set(randSpread(160), randSpread(190), randSpread(160));

      const scale = rand(0.4, 0.8);
      firefly.group.scale.set(scale, scale, scale);

      this.jar.add(firefly.group);
      this.jarFireflies.push(firefly);
    }
    for (let i = 0; i < 6; i += 1) {
      const firefly = new Fly({
        light: true,
        bodyColor: 0x5363B2,
        wingColor: 0xA9B8FC,
        lightColor: 0x00FFA5,
      });
      firefly.group.position.set(randSpread(400), rand(0, 300), randSpread(200));

      const scale = rand(0.3, 1);
      firefly.group.scale.set(scale, scale, scale);

      this.three.scene.add(firefly.group);
      this.fireflies.push(firefly);
    }
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const timer = 0.0001 * Date.now();

    this.jarFireflies.forEach((firefly, index) => {
      firefly.moveWings();

      const xPos = 50 * Math.cos(timer * index);
      const yPos = 80 * Math.sin(timer + index);
      const zPos = 60 * Math.sin(timer + index);
      firefly.group.position.set(xPos, yPos, zPos);
    });

    this.fireflies.forEach((firefly, index) => {
      firefly.moveWings();

      const xPos = 400 * Math.cos(timer + index);
      const yPos = (60 * Math.sin(timer * index)) + 150;
      const zPos = 100 * Math.sin(timer + index);
      firefly.group.position.set(xPos, yPos, zPos);
    });

    this.dotSystem.rotation.x += 0.0003;
    this.dotSystem.rotation.y -= 0.0001;

    this.three.render();
  }
}
