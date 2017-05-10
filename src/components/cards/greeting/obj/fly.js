import * as THREE from 'three';

export default class Fly {
  constructor({
    light = false,
    bodyColor = 0x3F3F3F,
    wingColor = 0xffffff,
    lightColor = 0xFFFF7C,
  }) {
    this.group = new THREE.Group();

    this.bodyColor = bodyColor;
    this.wingColor = wingColor;

    this.vAngle = 0;

    this.drawBody();
    this.drawWings();

    if (light) {
      this.lightColor = lightColor;
      this.drawLight();
    }
  }
  drawBody() {
    const flyGeometry = new THREE.CylinderGeometry(12, 16, 18, 4);
    const flyMaterial = new THREE.MeshStandardMaterial({
      color: this.bodyColor,
      roughness: 1,
      shading: THREE.FlatShading,
    });
    const fly = new THREE.Mesh(flyGeometry, flyMaterial);
    fly.rotation.y = 45 * (Math.PI / 180);
    this.group.add(fly);
  }
  drawWings() {
    this.rightWing = new THREE.Mesh(
      new THREE.BoxGeometry(5, 12, 12),
      new THREE.MeshStandardMaterial({
        color: this.wingColor,
        roughness: 1,
        shading: THREE.FlatShading,
      }),
    );
    this.rightWing.position.set(8, 2, 0);
    this.rightWing.rotation.z = Math.PI / 4;
    this.rightWing.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -6, 0));
    this.group.add(this.rightWing);

    this.leftWing = this.rightWing.clone();
    this.leftWing.position.x = -this.rightWing.position.x;
    this.leftWing.rotation.z = -this.rightWing.rotation.z;
    this.group.add(this.leftWing);
  }
  drawLight() {
    const geometry = new THREE.CylinderGeometry(16, 8, 6, 4);
    const flyLight = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
      color: this.lightColor,
      shading: THREE.FlatShading,
    }));
    flyLight.rotation.y = 45 * (Math.PI / 180);

    const light = new THREE.PointLight(this.lightColor, 2, 200);
    light.add(flyLight);
    light.position.set(0, -12, 0);
    light.castShadow = true;
    this.group.add(light);
  }
  moveWings() {
    this.vAngle += 0.08;
    const wingAmplitude = Math.PI / 8;
    this.rightWing.rotation.z = (Math.PI / 4) - (Math.cos(this.vAngle) * wingAmplitude);
    this.leftWing.rotation.z = -this.rightWing.rotation.z;
  }
}
