<template lang='pug'>
  .world
</template>

<script>
import * as THREE from 'three';
import Three from '../Three';

import Chameleon from './obj/chameleon';
import Fly from './obj/fly';

export default {
  name: 'chameleon',
  data() {
    return {
      three: null,
      raycaster: null,

      chameleon: null,
      branch: null,
      fly: null,

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
      cameraPositionY: 10,
      cameraPositionZ: 10,
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
      this.draw();

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
    draw() {
      this.chameleon = new Chameleon();
      this.chameleon.group.position.set(3, 3, -10);
      this.three.scene.add(this.chameleon.group);

      this.fly = new Fly({
        light: false,
      });
      this.fly.group.scale.set(0.05, 0.05, 0.05);
      this.fly.group.position.set(0, 0, 15);
      this.fly.group.rotation.y = this.rad(90);
      this.three.scene.add(this.fly.group);

      this.drawBranch();
    },
    drawBranch() {
      const branch = new THREE.Mesh(
        new THREE.CylinderGeometry(0.76, 1.12, 2.14, 5),
        new THREE.MeshStandardMaterial({
          color: 0x17B26F,
          roughness: 1,
          shading: THREE.FlatShading,
        }),
      );
      branch.position.set(1.4, -5.2, -18);
      branch.rotation.set(this.rad(85.18), this.rad(4.14), this.rad(-20.4));
      branch.scale.set(3.78, 11.92, 2.72);
      branch.castShadow = true;
      branch.receiveShadow = true;
      this.three.scene.add(branch);
    },
    onMouseMove(event) {
      this.mouse.x = ((event.clientX / this.width) * 2) - 1;
      this.mouse.y = (-(event.clientY / this.height) * 2) + 1;
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.chameleon.changeColor(this.raycaster, this.mouse, this.three.camera);
      this.chameleon.moveHead(this.fly.group.position);

      this.fly.moveWings();

      const timer = Date.now() * 0.0001;
      this.fly.group.position.x = 4 * Math.cos(timer * 3);
      this.fly.group.position.y = 5 * Math.sin(timer * 6);

      this.three.render();
    },
    rad(degrees) {
      return degrees * (Math.PI / 180);
    },
  },
};
</script>
