<template lang='pug'>
  .chameleon
</template>

<script>
/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import Three from '../Three';

export default {
  name: 'chameleon',
  data() {
    return {
      three: null,
      raycaster: null,

      chameleon: null,
      head: null,

      branch: null,

      fly: null,
      rightWing: null,
      leftWing: null,
      wingAngle: 0,

      material: null,
      mouse: null,

      width: 0,
      height: 0,
    };
  },
  mounted() {
    this.three = new Three({
      container: this.$el,
      color: 0xF2A9B4,
      cameraPositionX: 30,
      cameraPositionY: 15,
      cameraPositionZ: 20,
    });
    this.width = this.$el.clientWidth;
    this.height = this.$el.clientHeight;

    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.three.init();
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      this.addLights();
      this.drawChameleon();
      this.drawBranch();
      this.drawFly();

      window.addEventListener('mousemove', this.onMouseMove);
    },
    addLights() {
      const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      this.three.scene.add(light);

      const directLight1 = new THREE.DirectionalLight();
      directLight1.castShadow = true;
      directLight1.position.set(20, 13, 12);
      this.three.scene.add(directLight1);

      const directLight2 = new THREE.DirectionalLight({
        color: 0xd9fbfc,
        intensity: 0.6,
      });
      directLight2.castShadow = true;
      directLight2.position.set(-27, 18, 6);
      this.three.scene.add(directLight2);
    },
    drawChameleon() {
      this.chameleon = new THREE.Object3D();
      this.chameleon.position.set(-1, 3, 2.7);
      this.chameleon.rotation.set(this.rad(18.84), 0, this.rad(2.2));
      this.three.scene.add(this.chameleon);

      this.material = new THREE.MeshStandardMaterial({
        color: 0x1CCCA3,
        roughness: 1,
        shading: THREE.FlatShading,
      });

      this.drawHead();
      this.drawBody();
      this.drawTail();
      this.drawLegs();

      this.chameleon.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    },
    drawBranch() {
      const branchGeometry = new THREE.CylinderGeometry(0.76, 1.12, 2.14, 5);
      const branchMaterial = new THREE.MeshStandardMaterial({
        color: 0x17B26F,
        roughness: 1,
        shading: THREE.FlatShading,
      });
      this.branch = new THREE.Mesh(branchGeometry, branchMaterial);
      this.branch.position.set(-2.76, -5.67, -7.86);
      this.branch.rotation.set(this.rad(85.18), this.rad(4.14), this.rad(-20.4));
      this.branch.scale.set(3.78, 11.92, 2.72);
      this.branch.castShadow = true;
      this.branch.receiveShadow = true;
      this.three.scene.add(this.branch);
    },
    drawFly() {
      const flyGeometry = new THREE.BoxGeometry(1, 1, 1);
      const flyMaterial = new THREE.MeshStandardMaterial({
        color: 0x3F3F3F,
        roughness: 1,
        shading: THREE.FlatShading,
      });
      this.fly = new THREE.Mesh(flyGeometry, flyMaterial);
      this.fly.position.set(0, 12.71, 19.08);
      this.three.scene.add(this.fly);

      const wingGeometry = new THREE.CylinderGeometry(0.42, 0.08, 1.26, 4);
      const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 1,
        shading: THREE.FlatShading,
      });

      this.rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
      this.rightWing.position.set(0, 0.2, 0.6);
      this.rightWing.rotation.set(Math.PI / 4, 0, Math.PI / 4);
      this.rightWing.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.21, 0.04));
      this.fly.add(this.rightWing);

      this.leftWing = this.rightWing.clone();
      this.leftWing.position.z = -this.rightWing.position.z;
      this.fly.add(this.leftWing);
    },
    drawHead() {
      const headGeometry = new THREE.SphereGeometry(5, 4, 4);
      this.head = new THREE.Mesh(headGeometry, this.material);
      this.head.rotation.set(this.rad(90), this.rad(45), 0);
      this.chameleon.add(this.head);

      // draw eyes

      const eyeGeometry = new THREE.CylinderGeometry(2, 1.3, 1.4, 5);
      const eyeWhiteGeometry = new THREE.CylinderGeometry(1.26, 0.78, 1.14, 5);
      const eyeBlackGeometry = new THREE.CylinderGeometry(0.86, 0.36, 1.14, 5);

      const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 1,
        shading: THREE.FlatShading,
      });
      const eyeBlackMaterial = new THREE.MeshStandardMaterial({
        color: 0x3F3F3F,
        roughness: 1,
        shading: THREE.FlatShading,
      });

      const rightEye = new THREE.Mesh(eyeGeometry, this.material);
      rightEye.position.set(3, 1.6, 1.6);
      rightEye.rotation.set(this.rad(-27.2), this.rad(-45), this.rad(90));
      this.head.add(rightEye);

      const rightEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
      rightEyeWhite.position.set(0.02, -0.37, -0.06);
      rightEye.add(rightEyeWhite);

      const rightEyeBlack = new THREE.Mesh(eyeBlackGeometry, eyeBlackMaterial);
      rightEyeBlack.position.set(-0.01, -0.27, -0.01);
      rightEyeWhite.add(rightEyeBlack);

      const leftEye = new THREE.Mesh(eyeGeometry, this.material);
      leftEye.position.set(-1.62, 1.47, -2.92);
      leftEye.rotation.set(this.rad(25), this.rad(-225), this.rad(82.8));
      this.head.add(leftEye);

      const leftEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
      leftEyeWhite.position.set(0.02, -0.37, -0.06);
      leftEye.add(leftEyeWhite);

      this.leftEyeBlack = new THREE.Mesh(eyeBlackGeometry, eyeBlackMaterial);
      this.leftEyeBlack.position.set(-0.01, -0.27, -0.01);
      leftEyeWhite.add(this.leftEyeBlack);

      // draw nose

      const noseGeometry = new THREE.CylinderGeometry(0.88, 3.52, 1.96, 4);
      const nose = new THREE.Mesh(noseGeometry, this.material);
      nose.position.set(-0.02, 4.53, 0);
      this.head.add(nose);

      // draw cap

      const capGeometry = new THREE.CylinderGeometry(0.96, 3.5, 4, 4);
      const cap = new THREE.Mesh(capGeometry, this.material);
      cap.position.set(1.88, -1.54, -1.85);
      this.head.add(cap);
    },
    drawBody() {
      const body = new THREE.Object3D();
      body.position.set(4.19, -4.51, -2.7);
      body.rotation.set(this.rad(62.4), this.rad(45), 0);
      this.chameleon.add(body);

      const neckGeometry = new THREE.CylinderGeometry(3.48, 7, 8, 4);
      const neck = new THREE.Mesh(neckGeometry, this.material);
      neck.position.set(0, -1.46, -5.85);
      body.add(neck);

      const torsoGeometry = new THREE.CylinderGeometry(7, 3.9, 6, 4);
      const torso = new THREE.Mesh(torsoGeometry, this.material);
      torso.position.set(-0.03, -8.4, -5.87);
      body.add(torso);

      const backGeometry = new THREE.CylinderGeometry(3.9, 1.4, 3, 4);
      const back = new THREE.Mesh(backGeometry, this.material);
      back.position.set(-0.03, -12.9, -5.87);
      body.add(back);
    },
    drawTail() {
      const tailGeometry = new THREE.CylinderGeometry(2.14, 1.2, 8.7, 4);
      const tail = new THREE.Mesh(tailGeometry, this.material);
      tail.position.set(0.05, -7.85, -17.43);
      tail.rotation.set(this.rad(48), this.rad(45), 0);
      this.chameleon.add(tail);

      const tailPart1Geometry = new THREE.CylinderGeometry(1.2, 1, 13, 4);
      const tailPart1 = new THREE.Mesh(tailPart1Geometry, this.material);
      tailPart1.position.set(-3.76, -6.24, 3.92);
      tailPart1.rotation.set(this.rad(67.4), this.rad(45), this.rad(-116.6));
      tail.add(tailPart1);

      const tailPart2Geometry = new THREE.CylinderGeometry(0.78, 1, 7, 4);
      const tailPart2 = new THREE.Mesh(tailPart2Geometry, this.material);
      tailPart2.position.set(-8.46, -5.13, 8.86);
      tailPart2.rotation.set(this.rad(17.6), this.rad(3), this.rad(16.2));
      tail.add(tailPart2);

      const tailPart3Geometry = new THREE.CylinderGeometry(1.2, 0.76, 5, 4);
      const tailPart3 = new THREE.Mesh(tailPart3Geometry, this.material);
      tailPart3.position.set(-7.55, -1.35, 7.96);
      tailPart3.rotation.set(this.rad(67.4), this.rad(45), this.rad(-116.6));
      tail.add(tailPart3);

      const tailPart4Geometry = new THREE.CylinderGeometry(1.2, 0.74, 4.06, 4);
      const tailPart4 = new THREE.Mesh(tailPart4Geometry, this.material);
      tailPart4.position.set(-5.24, -1.2, 5.52);
      tailPart4.rotation.set(this.rad(15.4), this.rad(2.8), this.rad(13));
      tail.add(tailPart4);
    },
    drawLegs() {
      const legGeometry = new THREE.CylinderGeometry(1.56, 1, 3.96, 4);
      const fingerGeometry = new THREE.CylinderGeometry(0.4, 1.04, 2, 4);

      const rightLeg = new THREE.Mesh(legGeometry, this.material);
      rightLeg.position.set(2.34, -5.86, -4.55);
      rightLeg.rotation.set(this.rad(-12.6), this.rad(53), 0);
      this.chameleon.add(rightLeg);

      const finger1 = new THREE.Mesh(fingerGeometry, this.material);
      finger1.position.set(0.32, -1.55, 1.21);
      finger1.rotation.set(this.rad(105.4), this.rad(41), 0);
      rightLeg.add(finger1);

      const finger2 = new THREE.Mesh(fingerGeometry, this.material);
      finger2.position.set(-0.76, -1.5, 0.61);
      finger2.rotation.set(this.rad(59.8), this.rad(39.6), this.rad(69.6));
      rightLeg.add(finger2);

      const finger3 = new THREE.Mesh(fingerGeometry, this.material);
      finger3.position.set(-1.11, -1.57, -0.58);
      finger3.rotation.set(this.rad(43.2), this.rad(-9.8), this.rad(120.8));
      rightLeg.add(finger3);

      const leftLeg = rightLeg.clone();
      leftLeg.position.set(-2.08, -5.86, -4.55);
      leftLeg.rotation.set(this.rad(-20.6), this.rad(45), 0);
      this.chameleon.add(leftLeg);

      const backRightLeg = rightLeg.clone();
      backRightLeg.position.set(2.39, -9.07, -10.93);
      backRightLeg.rotation.set(this.rad(-19.4), this.rad(51.2), this.rad(4.2));
      backRightLeg.scale.set(0.7, 0.7, 0.7);
      this.chameleon.add(backRightLeg);

      const backLeftLeg = backRightLeg.clone();
      backLeftLeg.position.set(-2.08, -8.9, -10.1);
      backLeftLeg.rotation.set(this.rad(-18), this.rad(28.6), 0);
      this.chameleon.add(backLeftLeg);
    },
    onMouseMove(event) {
      this.mouse.x = ((event.clientX / this.width) * 2) - 1;
      this.mouse.y = (-(event.clientY / this.height) * 2) + 1;
    },
    changeColor() {
      this.raycaster.setFromCamera(this.mouse, this.three.camera);
      const intersects = this.raycaster.intersectObjects(this.chameleon.children, true);

      if (intersects.length > 0) {
        if (intersects[0].object.material.color.getHexString() === 'ffffff' ||
        intersects[0].object.material.color.getHexString() === '3f3f3f') return;

        const time = Date.now() * 0.00005;
        const h = ((360 * (1.0 + time)) % 360) / 360;
        intersects[0].object.material.color.setHSL(h, 1.0, 0.6);
      }
    },
    rotateHead() {
      this.head.lookAt(this.fly.position);
      this.head.rotation.x += this.rad(90);
      this.head.rotation.y += this.rad(45);
      this.head.position.y = 1;
    },
    moveFlyWings() {
      this.wingAngle += 0.5;
      const wingAmplitude = Math.PI / 8;
      this.rightWing.rotation.x = (Math.PI / 4) - (Math.cos(this.wingAngle) * wingAmplitude);
      this.leftWing.rotation.x = (-Math.PI / 4) + (Math.cos(this.wingAngle) * wingAmplitude);
    },
    moveFly() {
      const timer = 0.0001 * Date.now();
      this.fly.position.x = 4 * Math.cos(timer * 3);
      this.fly.position.y = 5 * Math.sin(timer * 6);
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.changeColor();
      this.rotateHead();

      this.moveFlyWings();
      this.moveFly();

      this.three.render();
    },
    rad(degrees) {
      return degrees * (Math.PI / 180);
    },
  },
};
</script>

<style>
.chameleon {
  width: 100%;
  height: 100%;
}
</style>
