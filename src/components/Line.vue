<template>
  <div class='line-bg'></div>
</template>

<script>
import * as THREE from 'three';
import Three from './three';

export default {
  name: 'line',
  data() {
    return {
      three: null,

      mouseX: 0,
      mouseY: 0,
    };
  },
  mounted() {
    this.three = new Three({
      container: this.$el,
      transparent: true,
      alpha: 0,
    });

    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.three.init();
      this.createLines();

      document.addEventListener('mousemove', this.onMouseMove.bind(this));
    },
    createLines() {
      const material = new THREE.SpriteMaterial({ color: 0xf6e6fa });
      const geometry = new THREE.Geometry();

      for (let i = 0; i < 100; i += 1) {
        const sprite = new THREE.Sprite(material);
        sprite.position.set(
          (Math.random() * 2) - 1,
          (Math.random() * 2) - 1,
          (Math.random() * 2) - 1,
        );
        sprite.position.normalize();
        sprite.position.multiplyScalar((Math.random() * 10) + 450);
        geometry.vertices.push(sprite.position);
      }

      const lineCircle = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0xf6e6fa,
        transparent: true,
        opacity: 0.8,
      }));
      lineCircle.scale.set(2, 2, 2);

      this.three.scene.add(lineCircle);
    },
    onMouseMove(event) {
      this.mouseX = event.clientX - (window.innerWidth / 2);
      this.mouseY = event.clientY - (window.innerHeight / 2);
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.three.camera.position.x += (this.mouseX - this.three.camera.position.x) * 0.05;
      this.three.camera.position.y += (200 - this.mouseY - this.three.camera.position.y) * 0.05;
      this.three.camera.lookAt(this.three.scene.position);

      this.three.render();
    },
  },
};
</script>

<style>
.line-bg {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(69,69,122,1) 100%);
}
</style>
