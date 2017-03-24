<template lang='pug'>
  .cactus
</template>

<script>
import * as THREE from 'three';
import Three from './Three';

export default {
  name: 'cubic',
  data() {
    return {
      three: null,
    };
  },
  mounted() {
    this.three = new Three({
      container: this.$el,
      color: 0xf3f3f3,
      cameraPosition: 500,
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
      const geometry = new THREE.SphereGeometry(100, 5, 5);
      geometry.computeBoundingSphere();

      const scale = 300 / geometry.boundingSphere.radius;
      geometry.scale(scale, scale, scale);

      const originalGeometry = geometry.clone();
      originalGeometry.computeFaceNormals();
      originalGeometry.computeVertexNormals(true);

      geometry.mergeVertices();
      geometry.computeFaceNormals();
      geometry.computeVertexNormals(true);

      const group = new THREE.Group();
      this.three.scene.add(group);

      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: 0xfefefe,
        wireframe: true,
        opacity: 0.5,
      }));
      group.add(mesh);

      const innerGeometry = new THREE.SphereGeometry(220, 5, 5);
      const innerSphere = new THREE.Mesh(innerGeometry,
        new THREE.MeshBasicMaterial({ color: 0x68be83 }));

      mesh.add(innerSphere);

      for (let f = 0, fl = geometry.faces.length; f < fl; f += 1) {
        const face = geometry.faces[f];
        const centroid = new THREE.Vector3()
          .add(geometry.vertices[face.a])
          .add(geometry.vertices[face.b])
          .add(geometry.vertices[face.c])
          .divideScalar(3);
        const arrow = new THREE.ArrowHelper(face.normal, centroid, 15, 0x3333FF);
        mesh.add(arrow);
      }

      const fvNames = ['a', 'b', 'c', 'd'];

      for (let f = 0, fl = originalGeometry.faces.length; f < fl; f += 1) {
        const face = originalGeometry.faces[f];
        for (let v = 0, vl = face.vertexNormals.length; v < vl; v += 1) {
          const arrow = new THREE.ArrowHelper(
            face.vertexNormals[v],
            originalGeometry.vertices[face[fvNames[v]]],
            15,
            0xFF3333,
          );
          mesh.add(arrow);
        }
      }

      for (let f = 0, fl = mesh.geometry.faces.length; f < fl; f += 1) {
        const face = mesh.geometry.faces[f];
        for (let v = 0, vl = face.vertexNormals.length; v < vl; v += 1) {
          const arrow = new THREE.ArrowHelper(
            face.vertexNormals[v],
            mesh.geometry.vertices[face[fvNames[v]]],
            15,
            0x000000,
          );
          mesh.add(arrow);
        }
      }
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.three.render();
    },
  },
};
</script>

<style>
.cactus {
  width: 100%;
  height: 100%;
}
</style>
