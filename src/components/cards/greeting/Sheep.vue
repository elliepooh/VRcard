<template lang='pug'>
  .world
</template>

<script>
import * as THREE from 'three';
import Three from '../Three';

import Sheep from './obj/sheep';

export default {
  name: 'chameleon',
  data() {
    return {
      three: null,

      sheep: null,
      cloud: null,
      sky: null,

      cloudParts: [],
      vAngle: 0,

      mouseDown: false,
    };
  },
  mounted() {
    this.three = new Three({
      container: this.$el,
      color: 0xCDAAFD,
      cameraPositionZ: 900,
    });

    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.three.init();

      this.addLights();
      this.draw();

      document.addEventListener('mousedown', () => {
        this.mouseDown = true;
      });
      document.addEventListener('mouseup', () => {
        this.mouseDown = false;
      });
      document.addEventListener('touchstart', () => {
        this.mouseDown = true;
      });
      document.addEventListener('touchend', () => {
        this.mouseDown = false;
      });
    },
    addLights() {
      const ambientLight = new THREE.AmbientLight();
      this.three.scene.add(ambientLight);

      const directLight1 = new THREE.DirectionalLight(0xffd798, 0.8);
      directLight1.castShadow = true;
      directLight1.position.set(100, 200, 100);
      this.three.scene.add(directLight1);

      const directLight2 = new THREE.DirectionalLight(0xFFB5E2, 0.7);
      directLight2.castShadow = true;
      directLight2.position.set(-150, 100, 100);
      this.three.scene.add(directLight2);
    },
    draw() {
      this.sheep = new Sheep();
      this.sheep.group.position.y = 40;
      this.three.scene.add(this.sheep.group);

      this.drawCloud();
      this.drawSky();
    },
    drawCloud() {
      this.cloud = new THREE.Group();
      this.cloud.position.y = -200;
      this.cloud.scale.set(1.5, 1.5, 1.5);
      this.three.scene.add(this.cloud);

      const material = new THREE.MeshStandardMaterial({
        color: 0xacb3fb,
        roughness: 1,
        shading: THREE.FlatShading,
      });
      const partGeometry = new THREE.IcosahedronGeometry(100, 0);

      this.upperPart = new THREE.Mesh(partGeometry, material);
      this.upperPart.castShadow = true;
      this.upperPart.receiveShadow = true;
      this.cloud.add(this.upperPart);

      this.leftPart = this.upperPart.clone();
      this.leftPart.position.set(-120, -30, 0);
      this.leftPart.scale.set(0.8, 0.8, 0.8);
      this.cloud.add(this.leftPart);

      this.rightPart = this.leftPart.clone();
      this.rightPart.position.x = -this.leftPart.position.x;
      this.cloud.add(this.rightPart);

      this.frontPart = this.leftPart.clone();
      this.frontPart.position.set(0, -40, 90);
      this.frontPart.scale.set(0.7, 0.7, 0.7);
      this.cloud.add(this.frontPart);

      this.backPart = this.frontPart.clone();
      this.backPart.position.z = -this.frontPart.position.z;
      this.cloud.add(this.backPart);
    },
    drawSky() {
      this.sky = new THREE.Group();
      this.three.scene.add(this.sky);

      const colors = [0xF8007E, 0xFFC363, 0xDDD7FE, 0xFFFFFF, 0xEFD2DA];

      for (let i = 0; i < 20; i += 1) {
        const geometry = new THREE.IcosahedronGeometry(40, 0);
        const material = new THREE.MeshStandardMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          roughness: 1,
          shading: THREE.FlatShading,
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set((Math.random() - 0.5) * 2000,
                           (Math.random() - 0.5) * 2000,
                           (Math.random() - 0.5) * 2000);
        this.sky.add(mesh);
      }
    },
    cloudBend() {
      this.vAngle += 0.08;
      this.upperPart.position.y = -Math.cos(this.vAngle) * 12;
      this.leftPart.position.y = (-Math.cos(this.vAngle) * 10) - 30;
      this.rightPart.position.y = (-Math.cos(this.vAngle) * 10) - 30;
      this.frontPart.position.y = (-Math.cos(this.vAngle) * 8) - 30;
      this.backPart.position.y = (-Math.cos(this.vAngle) * 8) - 30;
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.sheep.jumpOnMouseDown(this.mouseDown);
      if (this.sheep.group.position.y > 40) this.cloudBend();

      this.sky.rotation.x += 0.001;
      this.sky.rotation.y -= 0.004;

      this.three.render();
    },
  },
};
</script>
