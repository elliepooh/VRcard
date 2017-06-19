import {
  Group,
  Mesh,
  IcosahedronGeometry,
  MeshPhongMaterial,
  TorusGeometry,
  TetrahedronGeometry,
  FlatShading,
} from 'three';

/* eslint-disable no-param-reassign */
export default class Saturn {
  constructor() {
    this.group = new Group();

    this.color = '#0E2255';
    this.draw();
  }
  draw() {
    this.saturn = new Group();
    this.group.add(this.saturn);

    const planetGeometry = new IcosahedronGeometry(100, 1);
    const planetMaterial = new MeshPhongMaterial({
      color: 0x37BE95,
      shading: FlatShading,
    });
    const planet = new Mesh(planetGeometry, planetMaterial);

    planet.castShadow = true;
    planet.receiveShadow = true;
    planet.position.set(0, 40, 0);
    this.saturn.add(planet);

    const ringGeometry = new TorusGeometry(140, 12, 6, 15);
    const ringMeterial = new MeshPhongMaterial({
      color: 0x6549C0,
      shading: FlatShading,
    });
    const ring = new Mesh(ringGeometry, ringMeterial);
    ring.position.set(0, 40, 0);
    ring.rotateX(80);
    ring.castShadow = true;
    ring.receiveShadow = true;
    this.saturn.add(ring);

    const colors = [0x37BE95, 0xF3F3F3, 0x6549C0];

    this.particles = new Group();
    this.group.add(this.particles);
    const geometry = new TetrahedronGeometry(5, 0);

    for (let i = 0; i < 500; i += 1) {
      const material = new MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        shading: FlatShading,
      });
      const mesh = new Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000);
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      this.particles.add(mesh);
    }
  }
  animate() {
    this.particles.rotation.x += 0.001;
    this.particles.rotation.y -= 0.004;
    this.saturn.rotation.y += 0.003;
  }
}
