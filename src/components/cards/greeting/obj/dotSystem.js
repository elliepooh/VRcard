import * as THREE from 'three';

import dotTexture from '@/assets/textures/dot.svg';

export default class DotSystem {
  constructor({
    intensity = 5000,
    color = 0xffffff,
    xSpread = 1000,
    ySpread = 1000,
    zSpread = 1000,
    size = 6,
  }) {
    this.group = new THREE.Group();

    this.intensity = intensity;
    this.color = color;
    this.xSpread = xSpread;
    this.ySpread = ySpread;
    this.zSpread = zSpread;
    this.size = size;

    this.draw();
  }
  draw() {
    const geometry = new THREE.Geometry();
    const colors = [];
    const sprite = new THREE.TextureLoader().load(dotTexture);

    for (let i = 0; i < this.intensity; i += 1) {
      const star = new THREE.Vector3();
      star.x = THREE.Math.randFloatSpread(this.xSpread);
      star.y = THREE.Math.randFloatSpread(this.ySpread);
      star.z = THREE.Math.randFloatSpread(this.zSpread);

      geometry.vertices.push(star);

      colors[i] = new THREE.Color(this.color);
    }
    geometry.colors = colors;

    const material = new THREE.PointsMaterial({
      size: this.size,
      map: sprite,
      vertexColors: THREE.VertexColors,
      alphaTest: 0.5,
      transparent: true,
    });

    const particles = new THREE.Points(geometry, material);
    this.group.add(particles);
  }
}
