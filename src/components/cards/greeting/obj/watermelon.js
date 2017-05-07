import * as THREE from 'three';
import seedTexture from '@/assets/textures/dots.png';

/* eslint-disable no-mixed-operators */
export default class Watermelon {
  constructor() {
    this.group = new THREE.Group();

    this.watermelon = new THREE.Group();
    this.watermelon.position.y = 200;
    this.group.add(this.watermelon);
    this.seeds = [];

    const loader = new THREE.TextureLoader();
    loader.load(seedTexture, (texture) => {
      this.drawWatermelon(texture);
      this.drawSeeds();
    });
  }
  drawWatermelon(texture) {
    const rind = new THREE.Object3D();
    this.watermelon.add(rind);

    const rindGeometry = new THREE.TorusGeometry(200, 40, 6, 8, 3.1);
    const rindMaterial = new THREE.MeshPhongMaterial({
      color: 0x448044,
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
    });
    const rindFront = new THREE.Mesh(rindGeometry, rindMaterial);
    rind.add(rindFront);

    const rindTopRight = new THREE.Mesh(new THREE.CylinderBufferGeometry(40.5, 40.5, 6, 6),
      rindMaterial);
    rindTopRight.rotateY(0.5);
    rindTopRight.position.x = 200;
    const rindTopLeft = rindTopRight.clone();
    rindTopLeft.rotateZ(-0.02);
    rindTopLeft.position.set(-200, 6, 0);
    rind.add(rindTopRight);
    rind.add(rindTopLeft);

    const flesh = new THREE.Object3D();
    this.watermelon.add(flesh);

    const fleshGeometry = new THREE.CylinderGeometry(200, 200, 80, 8, 2, false, 0, 3.1);
    const fleshMaterial = new THREE.MeshPhongMaterial({
      color: 0xfa9f99,
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      map: texture,
    });
    const fleshFront = new THREE.Mesh(fleshGeometry, fleshMaterial);
    fleshFront.rotation.set(0, 1.57, 1.57);
    flesh.add(fleshFront);

    const fleshTop = new THREE.Mesh(new THREE.BoxGeometry(80, 400, 10), fleshMaterial);
    fleshTop.rotation.set(1.57, -0.02, 1.57);
    flesh.add(fleshTop);
  }
  drawSeeds() {
    const seedGeometry = new THREE.CylinderGeometry(10, 10, 8, 5);
    const seedMaterial = new THREE.MeshPhongMaterial({
      color: 0x182B2F,
      shading: THREE.FlatShading,
    });

    const numOfLines = 16;
    const seedsInLine = 5;

    for (let line = 0; line < numOfLines; line += 1) {
      for (let i = 0; i < seedsInLine; i += 1) {
        const seed = new THREE.Mesh(seedGeometry, seedMaterial);

        const randomW = Math.random() * 50 - 200 + i * 80;
        const randomH = Math.random() * 50 + 130 - line * 50;
        seed.rotation.set(0, 1.57, 1.57);
        seed.position.set(randomW, randomH, 0);
        this.group.add(seed);

        seed.origX = seed.position.x;
        seed.origY = seed.position.y;
        this.seeds.push(seed);
      }
    }
  }
  moveSeedsDown() {
    for (let s = 0, sl = this.seeds.length; s < sl; s += 1) {
      const seed = this.seeds[s];
      if (seed.position.y > -600) {
        seed.origY -= 0.5;
        seed.position.y -= 0.5;
      } else {
        seed.origY = Math.random() * 20 + 200;
        seed.origX = Math.random() * 50 - 200 + (s % 5) * 80;

        seed.position.y = seed.origY;
        seed.position.x = seed.origX;
      }
    }
  }
  moveSeedsAway(pos) {
    for (let s = 0, sl = this.seeds.length; s < sl; s += 1) {
      const seed = this.seeds[s];

      const dx = (seed.origX - pos.x);
      const dy = (seed.origY - pos.y);
      const dz = (seed.position.z - pos.z);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (len === 0) return;
        const ndx = dx / len;
        const ndy = dy / len;
        seed.position.x = seed.origX + ndx * 20;
        seed.position.y = seed.origY + ndy * 20;
      } else {
        seed.position.x = seed.origX;
        seed.position.y = seed.origY;
        seed.position.z = 0;
      }
    }
  }
}
