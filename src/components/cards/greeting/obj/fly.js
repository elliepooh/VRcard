import * as THREE from 'three';

export default class Fly {
  constructor() {
    this.group = new THREE.Group();

    this.wingAngle = 0;

    this.drawBody();
    this.drawWings();
  }
  drawBody() {
    const flyGeometry = new THREE.BoxGeometry(1, 1, 1);
    const flyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3F3F3F,
      roughness: 1,
      shading: THREE.FlatShading,
    });
    const fly = new THREE.Mesh(flyGeometry, flyMaterial);
    this.group.add(fly);
  }
  drawWings() {
    this.rightWing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.08, 1.26, 4),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 1,
        shading: THREE.FlatShading,
      }),
    );
    this.rightWing.position.set(0, 0.2, 0.6);
    this.rightWing.rotation.set(Math.PI / 4, 0, Math.PI / 4);
    this.rightWing.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.21, 0.04));
    this.group.add(this.rightWing);

    this.leftWing = this.rightWing.clone();
    this.leftWing.position.z = -this.rightWing.position.z;
    this.group.add(this.leftWing);
  }

  moveFly() {
    const timer = Date.now() * 0.0001;
    this.group.position.x = 4 * Math.cos(timer * 3);
    this.group.position.y = 5 * Math.sin(timer * 6);
  }
  moveWings() {
    this.wingAngle += 0.5;
    const wingAmplitude = Math.PI / 8;
    this.rightWing.rotation.x = (Math.PI / 4) - (Math.cos(this.wingAngle) * wingAmplitude);
    this.leftWing.rotation.x = (-Math.PI / 4) + (Math.cos(this.wingAngle) * wingAmplitude);
  }
}
