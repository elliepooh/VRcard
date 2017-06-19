import {
  Group,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderGeometry,
  FlatShading,
} from 'three';

import Fly from './Fly';

/* eslint-disable class-methods-use-this */
export default class Chameleon {
  constructor() {
    this.group = new Group();
    this.group.scale.set(20, 20, 20);
    this.group.rotation.y = -1.2;

    this.color = '#FFB2BD';

    this.draw();
  }
  draw() {
    this.fly = new Fly({ light: false });
    this.fly.group.scale.set(0.05, 0.05, 0.05);
    this.fly.group.position.set(0, 0, 15);
    this.fly.group.rotation.y = 1.57;
    this.group.add(this.fly.group);

    this.drawChameleon();
    this.drawBranch();
  }
  drawChameleon() {
    const chameleon = new Group();
    chameleon.position.set(3, 3, -10);
    chameleon.rotation.set(0.3, 0, 0.04);
    this.group.add(chameleon);

    this.material = new MeshStandardMaterial({
      color: 0x5CE8D7,
      roughness: 1,
      shading: FlatShading,
    });

    // draw head
    const headGeometry = new SphereGeometry(5, 4, 4);
    this.head = new Mesh(headGeometry, this.material);
    this.head.rotation.set(1.57, 0.78, 0);
    chameleon.add(this.head);

    const rightEye = this.drawSkinCylinder(2, 1.3, 1.4, 5);
    rightEye.position.set(3, 1.6, 1.6);
    rightEye.rotation.set(-0.47, -0.78, 1.57);
    this.head.add(rightEye);

    const rightEyeWhite = this.drawCylinder(0xffffff, 1.26, 0.78, 1.14, 5);
    rightEyeWhite.position.set(0.02, -0.37, -0.06);
    rightEye.add(rightEyeWhite);

    const rightEyeBlack = this.drawCylinder(0x3F3F3F, 0.86, 0.36, 1.14, 5);
    rightEyeBlack.position.set(-0.01, -0.27, -0.01);
    rightEyeWhite.add(rightEyeBlack);

    const leftEye = rightEye.clone();
    leftEye.position.set(-1.62, 1.47, -2.92);
    leftEye.rotation.set(0.44, -3.9, 1.44);
    this.head.add(leftEye);

    const leftEyeWhite = rightEyeWhite.clone();
    leftEyeWhite.position.set(0.02, -0.37, -0.06);
    leftEye.add(leftEyeWhite);

    const leftEyeBlack = rightEyeBlack.clone();
    leftEyeBlack.position.set(-0.01, -0.27, -0.01);
    leftEyeWhite.add(leftEyeBlack);

    const nose = this.drawSkinCylinder(0.88, 3.52, 1.96, 4);
    nose.position.set(-0.02, 4.53, 0);
    this.head.add(nose);

    const cap = this.drawSkinCylinder(0.96, 3.5, 4, 4);
    cap.position.set(1.88, -1.54, -1.85);
    this.head.add(cap);

    // draw body
    const body = new Group();
    body.position.set(4.19, -4.51, -2.7);
    body.rotation.set(1, 0.78, 0);
    chameleon.add(body);

    const neck = this.drawSkinCylinder(3.48, 7, 8, 4);
    neck.position.set(0, -1.46, -5.85);
    body.add(neck);

    const torso = this.drawSkinCylinder(7, 3.9, 6, 4);
    torso.position.set(-0.03, -8.4, -5.87);
    body.add(torso);

    const back = this.drawSkinCylinder(3.9, 1.4, 3, 4);
    back.position.set(-0.03, -12.9, -5.87);
    body.add(back);

    // draw tail
    const tail = this.drawSkinCylinder(2.14, 1.2, 8.7, 4);
    tail.position.set(0.05, -7.85, -17.43);
    tail.rotation.set(0.83, 0.78, 0);
    chameleon.add(tail);

    const tailPart1 = this.drawSkinCylinder(1.2, 1, 13, 4);
    tailPart1.position.set(-3.76, -6.24, 3.92);
    tailPart1.rotation.set(1.17, 0.78, -2);
    tail.add(tailPart1);

    const tailPart2 = this.drawSkinCylinder(0.78, 1, 7, 4);
    tailPart2.position.set(-8.46, -5.13, 8.86);
    tailPart2.rotation.set(0.3, 0.05, 0.28);
    tail.add(tailPart2);

    const tailPart3 = this.drawSkinCylinder(1.2, 0.76, 5, 4);
    tailPart3.position.set(-7.55, -1.35, 7.96);
    tailPart3.rotation.set(1.17, 0.78, -2);
    tail.add(tailPart3);

    const tailPart4 = this.drawSkinCylinder(1.2, 0.74, 4.06, 4);
    tailPart4.position.set(-5.24, -1.2, 5.52);
    tailPart4.rotation.set(0.27, 0.05, 0.22);
    tail.add(tailPart4);

    // draw legs
    const rightLeg = this.drawSkinCylinder(1.56, 1, 3.96, 4);
    rightLeg.position.set(2.34, -5.86, -4.55);
    rightLeg.rotation.set(-0.22, 0.92, 0);
    chameleon.add(rightLeg);

    const finger1 = this.drawSkinCylinder(0.4, 1.04, 2, 4);
    finger1.position.set(0.32, -1.55, 1.21);
    finger1.rotation.set(1.84, 0.71, 0);
    rightLeg.add(finger1);

    const finger2 = finger1.clone();
    finger2.position.set(-0.76, -1.5, 0.61);
    finger2.rotation.set(1.03, 0.68, 1.2);
    rightLeg.add(finger2);

    const finger3 = finger1.clone();
    finger3.position.set(-1.11, -1.57, -0.58);
    finger3.rotation.set(0.75, 0.17, 2.1);
    rightLeg.add(finger3);

    const leftLeg = rightLeg.clone();
    leftLeg.position.set(-2.08, -5.86, -4.55);
    leftLeg.rotation.set(-0.36, 0.78, 0);
    chameleon.add(leftLeg);

    const backRightLeg = rightLeg.clone();
    backRightLeg.position.set(2.39, -9.07, -10.93);
    backRightLeg.rotation.set(-0.34, 0.9, 0.07);
    backRightLeg.scale.set(0.7, 0.7, 0.7);
    chameleon.add(backRightLeg);

    const backLeftLeg = backRightLeg.clone();
    backLeftLeg.position.set(-2.08, -8.9, -10.1);
    backLeftLeg.rotation.set(-0.31, 0.5, 0);
    chameleon.add(backLeftLeg);
  }
  drawBranch() {
    const branch = this.drawCylinder(0x2CDDCF, 0.76, 1.12, 2.14, 5);
    branch.position.set(1.4, -5.2, -18);
    branch.rotation.set(1.5, 0.07, -0.35);
    branch.scale.set(3.78, 11.92, 2.72);
    this.group.add(branch);
  }
  drawCylinder(materialColor, rTop, rBottom, height, radialSeg) {
    const geometry = new CylinderGeometry(rTop, rBottom, height, radialSeg);
    const material = new MeshStandardMaterial({
      color: materialColor,
      roughness: 1,
      shading: FlatShading,
    });
    const mesh = new Mesh(geometry, material);
    return mesh;
  }
  drawSkinCylinder(rTop, rBottom, height, radialSeg) {
    const geometry = new CylinderGeometry(rTop, rBottom, height, radialSeg);
    const mesh = new Mesh(geometry, this.material);
    return mesh;
  }
  animate() {
    const time = Date.now() * 0.00005;
    const h = ((360 * (1.0 + time)) % 360) / 360;
    this.material.color.setHSL(h, 1.0, 0.6);

    this.head.lookAt(this.fly.group.position);
    this.head.rotation.x += 1.57;
    this.head.rotation.y += 0.78;
    this.head.position.y = 1;

    this.fly.moveWings();

    const timer = Date.now() * 0.0001;
    this.fly.group.position.x = 4 * Math.cos(timer * 3);
    this.fly.group.position.y = 5 * Math.sin(timer * 6);
  }
}
