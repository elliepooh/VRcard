import * as THREE from 'three';

export default class Saturn {
  constructor() {
    this.group = new THREE.Group();
    this.group.rotation.set(0.4, 0.3, 0);

    this.draw();
  }
  draw() {
    const planetGeometry = new THREE.IcosahedronGeometry(100, 1);

    const planetMaterial = new THREE.MeshPhongMaterial({
      color: 0x37BE95,
      shading: THREE.FlatShading,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);

    planet.castShadow = true;
    planet.receiveShadow = true;
    planet.position.set(0, 40, 0);
    this.group.add(planet);

    const ringGeometry = new THREE.TorusGeometry(140, 12, 6, 15);
    const ringMeterial = new THREE.MeshStandardMaterial({
      color: 0x6549C0,
      shading: THREE.FlatShading,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMeterial);
    ring.position.set(0, 40, 0);
    ring.rotateX(80);
    ring.castShadow = true;
    ring.receiveShadow = true;
    this.group.add(ring);
  }
}
