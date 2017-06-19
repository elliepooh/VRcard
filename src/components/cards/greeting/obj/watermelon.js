import {
  Group,
  Mesh,
  TextureLoader,
  TorusGeometry,
  CircleGeometry,
  CylinderGeometry,
  BoxGeometry,
  MeshPhongMaterial,
  FlatShading,
  DoubleSide,
  Vector3,
} from 'three';

import seedTexture from '@/assets/textures/dots.png';

export default class Watermelon {
  constructor(container, camera) {
    this.group = new Group();
    this.group.scale.set(0.7, 0.7, 0.7);
    this.camera = camera;

    this.color = '#D4F3F4';
    this.width = container.clientWidth;
    this.height = container.clientHeight;

    this.draw();

    container.addEventListener('mousemove', this.onMouseMove.bind(this));
    container.addEventListener('touchmove', this.onMouseMove.bind(this));
  }
  draw() {
    // draw mouse
    const mouseGeometry = new CircleGeometry(50);
    const mouseMaterial = new MeshPhongMaterial({
      transparent: true,
      opacity: 0,
    });
    this.mouse = new Mesh(mouseGeometry, mouseMaterial);
    this.mouse.position.set(0, 0, -5);
    this.group.add(this.mouse);

    this.drawWatermelon();
  }
  drawWatermelon() {
    this.watermelon = new Group();
    this.watermelon.position.y = 200;
    this.group.add(this.watermelon);
    this.seeds = [];

    const loader = new TextureLoader();
    loader.load(seedTexture, (texture) => {
      const rind = new Group();
      this.watermelon.add(rind);

      const rindGeometry = new TorusGeometry(200, 40, 6, 8, 3.1);
      const rindMaterial = new MeshPhongMaterial({
        color: 0x448044,
        shading: FlatShading,
        side: DoubleSide,
      });
      const rindFront = new Mesh(rindGeometry, rindMaterial);
      rind.add(rindFront);

      const rindTopRight = new Mesh(new CylinderGeometry(40.5, 40.5, 6, 6),
        rindMaterial);
      rindTopRight.rotateY(0.5);
      rindTopRight.position.x = 200;
      const rindTopLeft = rindTopRight.clone();
      rindTopLeft.rotateZ(-0.02);
      rindTopLeft.position.set(-200, 6, 0);
      rind.add(rindTopRight);
      rind.add(rindTopLeft);

      const flesh = new Group();
      this.watermelon.add(flesh);

      const fleshGeometry = new CylinderGeometry(200, 200, 80, 8, 2, false, 0, 3.1);
      const fleshMaterial = new MeshPhongMaterial({
        color: 0xfa9f99,
        shading: FlatShading,
        side: DoubleSide,
        map: texture,
      });
      const fleshFront = new Mesh(fleshGeometry, fleshMaterial);
      fleshFront.rotation.set(0, 1.57, 1.57);
      flesh.add(fleshFront);

      const fleshTop = new Mesh(new BoxGeometry(80, 400, 10), fleshMaterial);
      fleshTop.rotation.set(1.57, -0.02, 1.57);
      flesh.add(fleshTop);
    });

    const seedGeometry = new CylinderGeometry(10, 10, 8, 5);
    const seedMaterial = new MeshPhongMaterial({
      color: 0x182B2F,
      shading: FlatShading,
    });

    const numOfLines = 16;
    const seedsInLine = 5;

    for (let line = 0; line < numOfLines; line += 1) {
      for (let i = 0; i < seedsInLine; i += 1) {
        const seed = new Mesh(seedGeometry, seedMaterial);

        const randomW = ((Math.random() * 50) - 200) + (i * 80);
        const randomH = ((Math.random() * 50) + 130) - (line * 50);
        seed.rotation.set(0, 1.57, 1.57);
        seed.position.set(randomW, randomH, 0);
        this.group.add(seed);

        seed.origX = seed.position.x;
        seed.origY = seed.position.y;
        this.seeds.push(seed);
      }
    }
  }
  animate() {
    for (let s = 0, sl = this.seeds.length; s < sl; s += 1) {
      const seed = this.seeds[s];
      if (seed.position.y > -600) {
        seed.origY -= 0.5;
        seed.position.y -= 0.5;
      } else {
        seed.origY = (Math.random() * 20) + 200;
        seed.origX = ((Math.random() * 50) - 200) + ((s % 5) * 80);

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
      const dist = Math.sqrt((dx * dx) + (dy * dy));

      if (dist < 100) {
        const len = Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));

        if (len === 0) return;
        const ndx = dx / len;
        const ndy = dy / len;
        seed.position.x = seed.origX + (ndx * 20);
        seed.position.y = seed.origY + (ndy * 20);
      } else {
        seed.position.x = seed.origX;
        seed.position.y = seed.origY;
        seed.position.z = 0;
      }
    }
  }
  onMouseMove(event) {
    event.preventDefault();
    this.mouseX = ((event.clientX / this.width) * 2) - 1;
    this.mouseY = -((event.clientY / this.height) * 2) + 1;

    const vector = new Vector3(this.mouseX, this.mouseY, 1);
    vector.unproject(this.camera);
    const dir = vector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
    this.mouse.position.copy(pos);

    this.moveSeedsAway(pos);
  }
}
