<template lang='pug'>
  .card
</template>

<script>
import * as THREE from 'three';
import Three from './Three';

export default {
  name: 'card',
  data() {
    return {
      three: null,
    };
  },
  mounted() {
    this.three = new Three({
      container: this.$el,
      color: 0xf3f3f3,
      cameraPosition: 200,
    });
    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.three.init();
      const light = new THREE.PointLight({ intensity: 0.5 });
      light.position.set(1000, 1000, 2000);
      this.three.scene.add(light);
      this.draw();
    },
    draw() {

    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.three.render();
    },
  },
};
</script>

<style>
.card {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
