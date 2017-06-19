import {
  Group,
  Mesh,
  CylinderGeometry,
  MeshStandardMaterial,
  BoxGeometry,
  Matrix4,
  FlatShading,
  PointLight,
} from 'three';

export default class Fly {
  constructor({
    light = false,
    bodyColor = 0x3F3F3F,
    wingColor = 0xffffff,
    lightColor = 0xFFFF7C,
  }) {
    this.group = new Group();

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
    const flyGeometry = new CylinderGeometry(12, 16, 18, 4);
    const flyMaterial = new MeshStandardMaterial({
      color: this.bodyColor,
      roughness: 1,
      shading: FlatShading,
    });
    const fly = new Mesh(flyGeometry, flyMaterial);
    fly.rotation.y = 45 * (Math.PI / 180);
    this.group.add(fly);
  }
  drawWings() {
    this.rightWing = new Mesh(
      new BoxGeometry(5, 12, 12),
      new MeshStandardMaterial({
        color: this.wingColor,
        roughness: 1,
        shading: FlatShading,
      }),
    );
    this.rightWing.position.set(8, 2, 0);
    this.rightWing.rotation.z = Math.PI / 4;
    this.rightWing.geometry.applyMatrix(new Matrix4().makeTranslation(0, -6, 0));
    this.group.add(this.rightWing);

    this.leftWing = this.rightWing.clone();
    this.leftWing.position.x = -this.rightWing.position.x;
    this.leftWing.rotation.z = -this.rightWing.rotation.z;
    this.group.add(this.leftWing);
  }
  drawLight() {
    const geometry = new CylinderGeometry(16, 8, 6, 4);
    const flyLight = new Mesh(geometry, new MeshStandardMaterial({
      color: this.lightColor,
      shading: FlatShading,
    }));
    flyLight.rotation.y = 45 * (Math.PI / 180);

    const light = new PointLight(this.lightColor, 2, 400);
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
