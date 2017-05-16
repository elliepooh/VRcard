import * as THREE from 'three';

/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
export default class Chameleon {
  constructor() {
    this.group = new THREE.Group();
    this.group.rotation.set(this.rad(18.84), 0, this.rad(2.2));

    this.material = new THREE.MeshStandardMaterial({
      color: 0x5CE8D7,
      roughness: 1,
      shading: THREE.FlatShading,
    });

    this.drawHead();
    this.drawBody();
    this.drawTail();
    this.drawLegs();

    this.group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }
  drawHead() {
    const headGeometry = new THREE.SphereGeometry(5, 4, 4);
    this.head = new THREE.Mesh(headGeometry, this.material);
    this.head.rotation.set(this.rad(90), this.rad(45), 0);
    this.group.add(this.head);

    // draw eyes
    const rightEye = this.drawSkinCylinder(2, 1.3, 1.4, 5);
    rightEye.position.set(3, 1.6, 1.6);
    rightEye.rotation.set(this.rad(-27.2), this.rad(-45), this.rad(90));
    this.head.add(rightEye);

    const rightEyeWhite = this.drawCylinder(0xffffff, 1.26, 0.78, 1.14, 5);
    rightEyeWhite.position.set(0.02, -0.37, -0.06);
    rightEye.add(rightEyeWhite);

    const rightEyeBlack = this.drawCylinder(0x3F3F3F, 0.86, 0.36, 1.14, 5);
    rightEyeBlack.position.set(-0.01, -0.27, -0.01);
    rightEyeWhite.add(rightEyeBlack);

    const leftEye = rightEye.clone();
    leftEye.position.set(-1.62, 1.47, -2.92);
    leftEye.rotation.set(this.rad(25), this.rad(-225), this.rad(82.8));
    this.head.add(leftEye);

    const leftEyeWhite = rightEyeWhite.clone();
    leftEyeWhite.position.set(0.02, -0.37, -0.06);
    leftEye.add(leftEyeWhite);

    const leftEyeBlack = rightEyeBlack.clone();
    leftEyeBlack.position.set(-0.01, -0.27, -0.01);
    leftEyeWhite.add(leftEyeBlack);

    // draw nose
    const nose = this.drawSkinCylinder(0.88, 3.52, 1.96, 4);
    nose.position.set(-0.02, 4.53, 0);
    this.head.add(nose);

    // draw cap
    const cap = this.drawSkinCylinder(0.96, 3.5, 4, 4);
    cap.position.set(1.88, -1.54, -1.85);
    this.head.add(cap);
  }
  drawBody() {
    const body = new THREE.Object3D();
    body.position.set(4.19, -4.51, -2.7);
    body.rotation.set(this.rad(62.4), this.rad(45), 0);
    this.group.add(body);

    const neck = this.drawSkinCylinder(3.48, 7, 8, 4);
    neck.position.set(0, -1.46, -5.85);
    body.add(neck);

    const torso = this.drawSkinCylinder(7, 3.9, 6, 4);
    torso.position.set(-0.03, -8.4, -5.87);
    body.add(torso);

    const back = this.drawSkinCylinder(3.9, 1.4, 3, 4);
    back.position.set(-0.03, -12.9, -5.87);
    body.add(back);
  }
  drawTail() {
    const tail = this.drawSkinCylinder(2.14, 1.2, 8.7, 4);
    tail.position.set(0.05, -7.85, -17.43);
    tail.rotation.set(this.rad(48), this.rad(45), 0);
    this.group.add(tail);

    const tailPart1 = this.drawSkinCylinder(1.2, 1, 13, 4);
    tailPart1.position.set(-3.76, -6.24, 3.92);
    tailPart1.rotation.set(this.rad(67.4), this.rad(45), this.rad(-116.6));
    tail.add(tailPart1);

    const tailPart2 = this.drawSkinCylinder(0.78, 1, 7, 4);
    tailPart2.position.set(-8.46, -5.13, 8.86);
    tailPart2.rotation.set(this.rad(17.6), this.rad(3), this.rad(16.2));
    tail.add(tailPart2);

    const tailPart3 = this.drawSkinCylinder(1.2, 0.76, 5, 4);
    tailPart3.position.set(-7.55, -1.35, 7.96);
    tailPart3.rotation.set(this.rad(67.4), this.rad(45), this.rad(-116.6));
    tail.add(tailPart3);

    const tailPart4 = this.drawSkinCylinder(1.2, 0.74, 4.06, 4);
    tailPart4.position.set(-5.24, -1.2, 5.52);
    tailPart4.rotation.set(this.rad(15.4), this.rad(2.8), this.rad(13));
    tail.add(tailPart4);
  }
  drawLegs() {
    const rightLeg = this.drawSkinCylinder(1.56, 1, 3.96, 4);
    rightLeg.position.set(2.34, -5.86, -4.55);
    rightLeg.rotation.set(this.rad(-12.6), this.rad(53), 0);
    this.group.add(rightLeg);

    const finger1 = this.drawSkinCylinder(0.4, 1.04, 2, 4);
    finger1.position.set(0.32, -1.55, 1.21);
    finger1.rotation.set(this.rad(105.4), this.rad(41), 0);
    rightLeg.add(finger1);

    const finger2 = finger1.clone();
    finger2.position.set(-0.76, -1.5, 0.61);
    finger2.rotation.set(this.rad(59.8), this.rad(39.6), this.rad(69.6));
    rightLeg.add(finger2);

    const finger3 = finger1.clone();
    finger3.position.set(-1.11, -1.57, -0.58);
    finger3.rotation.set(this.rad(43.2), this.rad(-9.8), this.rad(120.8));
    rightLeg.add(finger3);

    const leftLeg = rightLeg.clone();
    leftLeg.position.set(-2.08, -5.86, -4.55);
    leftLeg.rotation.set(this.rad(-20.6), this.rad(45), 0);
    this.group.add(leftLeg);

    const backRightLeg = rightLeg.clone();
    backRightLeg.position.set(2.39, -9.07, -10.93);
    backRightLeg.rotation.set(this.rad(-19.4), this.rad(51.2), this.rad(4.2));
    backRightLeg.scale.set(0.7, 0.7, 0.7);
    this.group.add(backRightLeg);

    const backLeftLeg = backRightLeg.clone();
    backLeftLeg.position.set(-2.08, -8.9, -10.1);
    backLeftLeg.rotation.set(this.rad(-18), this.rad(28.6), 0);
    this.group.add(backLeftLeg);
  }
  changeColor(raycaster, mouse, camera) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(this.group.children, true);

    if (intersects.length > 0) {
      if (intersects[0].object.material.color.getHexString() === 'ffffff' ||
          intersects[0].object.material.color.getHexString() === '3f3f3f') return;

      const time = Date.now() * 0.00005;
      const h = ((360 * (1.0 + time)) % 360) / 360;
      intersects[0].object.material.color.setHSL(h, 1.0, 0.6);
    }
  }
  moveHead(flyPosition) {
    this.head.lookAt(flyPosition);
    this.head.rotation.x += this.rad(90);
    this.head.rotation.y += this.rad(45);
    this.head.position.y = 1;
  }
  drawCylinder(materialColor, rTop, rBottom, height, radialSeg) {
    const geometry = new THREE.CylinderGeometry(rTop, rBottom, height, radialSeg);
    const material = new THREE.MeshStandardMaterial({
      color: materialColor,
      roughness: 1,
      shading: THREE.FlatShading,
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
  drawSkinCylinder(rTop, rBottom, height, radialSeg) {
    const geometry = new THREE.CylinderGeometry(rTop, rBottom, height, radialSeg);
    const mesh = new THREE.Mesh(geometry, this.material);
    return mesh;
  }
  rad(degrees) {
    return degrees * (Math.PI / 180);
  }
}
