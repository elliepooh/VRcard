import * as THREE from 'three';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-mixed-operators */
export default class Sheep {
  constructor() {
    this.group = new THREE.Group();

    this.woolMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      shading: THREE.FlatShading,
    });
    this.skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaf8b,
      roughness: 1,
      shading: THREE.FlatShading,
    });
    this.darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4b4553,
      roughness: 1,
      shading: THREE.FlatShading,
    });

    this.vAngle = 0;

    this.drawBody();
    this.drawHead();
    this.drawLegs();
  }
  drawBody() {
    const bodyGeometry = new THREE.IcosahedronGeometry(170, 0);
    const body = new THREE.Mesh(bodyGeometry, this.woolMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    this.group.add(body);
  }
  drawHead() {
    const head = new THREE.Group();
    head.position.set(0, 65, 160);
    head.rotation.x = this.rad(-20);
    this.group.add(head);

    const foreheadGeometry = new THREE.BoxGeometry(70, 60, 70);
    const forehead = new THREE.Mesh(foreheadGeometry, this.skinMaterial);
    forehead.castShadow = true;
    forehead.receiveShadow = true;
    forehead.position.y = -15;
    head.add(forehead);

    const faceGeometry = new THREE.CylinderGeometry(50, 15, 40, 4, 1);
    const face = new THREE.Mesh(faceGeometry, this.skinMaterial);
    face.castShadow = true;
    face.receiveShadow = true;
    face.position.y = -65;
    face.rotation.y = this.rad(45);
    head.add(face);

    const woolGeometry = new THREE.BoxGeometry(84, 46, 90);
    const wool = new THREE.Mesh(woolGeometry, this.woolMaterial);
    wool.position.set(0, 12, 7);
    wool.rotation.x = this.rad(20);
    head.add(wool);

    const rightEyeGeometry = new THREE.CylinderGeometry(8, 10, 6, 6);
    const rightEye = new THREE.Mesh(rightEyeGeometry, this.darkMaterial);
    rightEye.castShadow = true;
    rightEye.receiveShadow = true;
    rightEye.position.set(35, -48, 33);
    rightEye.rotation.set(this.rad(130.8), 0, this.rad(-45));
    head.add(rightEye);

    const leftEye = rightEye.clone();
    leftEye.position.x = -rightEye.position.x;
    leftEye.rotation.z = -rightEye.rotation.z;
    head.add(leftEye);

    const rightEarGeometry = new THREE.BoxGeometry(12, 50, 30);
    rightEarGeometry.translate(0, -25, 0);
    this.rightEar = new THREE.Mesh(rightEarGeometry, this.skinMaterial);
    this.rightEar.castShadow = true;
    this.rightEar.receiveShadow = true;
    this.rightEar.position.set(35, -12, -7);
    this.rightEar.rotation.set(this.rad(20), 0, this.rad(50));
    head.add(this.rightEar);

    this.leftEar = this.rightEar.clone();
    this.leftEar.position.x = -this.rightEar.position.x;
    this.leftEar.rotation.z = -this.rightEar.rotation.z;
    head.add(this.leftEar);
  }
  drawLegs() {
    const legGeometry = new THREE.CylinderGeometry(30, 15, 100, 4);
    legGeometry.translate(0, -50, 0);
    this.frontRightLeg = new THREE.Mesh(legGeometry, this.darkMaterial);
    this.frontRightLeg.castShadow = true;
    this.frontRightLeg.receiveShadow = true;
    this.frontRightLeg.position.set(70, -80, 50);
    this.frontRightLeg.rotation.x = this.rad(-12);
    this.group.add(this.frontRightLeg);

    this.frontLeftLeg = this.frontRightLeg.clone();
    this.frontLeftLeg.position.x = -this.frontRightLeg.position.x;
    this.frontLeftLeg.rotation.z = -this.frontRightLeg.rotation.z;
    this.group.add(this.frontLeftLeg);

    this.backRightLeg = this.frontRightLeg.clone();
    this.backRightLeg.position.z = -this.frontRightLeg.position.z;
    this.backRightLeg.rotation.x = -this.frontRightLeg.rotation.x;
    this.group.add(this.backRightLeg);

    this.backLeftLeg = this.frontLeftLeg.clone();
    this.backLeftLeg.position.z = -this.frontLeftLeg.position.z;
    this.backLeftLeg.rotation.x = -this.frontLeftLeg.rotation.x;
    this.group.add(this.backLeftLeg);
  }
  jump(speed) {
    this.vAngle += speed;
    this.group.position.y = Math.sin(this.vAngle) * 100 + 138;

    const legRotation = Math.sin(this.vAngle) * Math.PI / 6 + 0.4;

    this.frontRightLeg.rotation.z = legRotation;
    this.backRightLeg.rotation.z = legRotation;
    this.frontLeftLeg.rotation.z = -legRotation;
    this.backLeftLeg.rotation.z = -legRotation;

    const earRotation = Math.sin(this.vAngle) * Math.PI / 6 + 1.5;

    this.rightEar.rotation.z = earRotation;
    this.leftEar.rotation.z = -earRotation;
  }
  jumpOnMouseDown(mouseDown) {
    if (mouseDown) {
      this.jump(0.04);
    } else {
      if (this.group.position.y <= 40) return;
      this.jump(0.08);
    }
  }
  rad(degrees) {
    return degrees * (Math.PI / 180);
  }
}
