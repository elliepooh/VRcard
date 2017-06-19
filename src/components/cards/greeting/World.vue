<template lang='pug'>
  .world
    transition(name='flip')
      .sky(:style='{ backgroundColor: skyColor }' v-if='showSky')
    .container
    a.nav-btn.btn-prev(@click='prevCard')
    a.nav-btn.btn-next(@click='nextCard')
</template>

<script>
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  HemisphereLight,
  DirectionalLight,
} from 'three';

import Chameleon from './obj/Chameleon';
import Saturn from './obj/Saturn';
import Sheep from './obj/Sheep';
import Watermelon from './obj/Watermelon';

export default {
  name: 'world',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,

      obj: [
        Watermelon,
        Saturn,
        Chameleon,
        Sheep,
      ],
      cards: [],
      colors: [],
      index: 0,

      distance: 2000,

      showSky: true,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  computed: {
    card() {
      return this.cards[this.index];
    },
    skyColor() {
      return this.colors[this.index];
    },
  },
  methods: {
    init() {
      this.width = this.$el.clientWidth;
      this.height = this.$el.clientHeight;

      this.scene = new Scene();
      this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
      this.camera.position.set(0, 0, 500);
      this.camera.lookAt(this.scene.position);

      this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = PCFSoftShadowMap;

      this.drawCards();
      this.addLights();

      this.container = this.$el.querySelector('.container');
      this.container.appendChild(this.renderer.domElement);

      window.addEventListener('resize', this.onResize);
    },
    drawCards() {
      for (let i = 0; i < this.obj.length; i += 1) {
        const card = new this.obj[i](this.$el, this.camera);
        card.group.position.x = i * this.distance;

        this.scene.add(card.group);
        this.cards.push(card);
        this.colors.push(card.color);
      }
    },
    addLights() {
      const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.8);
      this.scene.add(hemiLight);

      const light1 = new DirectionalLight(0xffffff, 0.8);
      light1.position.set(100, 100, 200);
      light1.castShadow = true;
      this.scene.add(light1);

      const light2 = new DirectionalLight(0xffffff, 0.4);
      light2.position.set(-100, 200, 50);
      light2.castShadow = true;
      this.scene.add(light2);
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.card.animate();

      this.renderer.render(this.scene, this.camera);
    },
    prevCard() {
      this.toggleSky();
      this.index = this.index === 0 ? this.cards.length - 1 : this.index - 1;
    },
    nextCard() {
      this.toggleSky();
      this.index = this.index === this.cards.length - 1 ? 0 : this.index + 1;
    },
    onResize() {
      this.width = this.$el.clientWidth;
      this.height = this.$el.clientHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    },
    toggleSky() {
      this.showSky = false;
      setTimeout(() => {
        this.camera.position.x = this.index * this.distance;
        this.showSky = true;
      }, 1000);
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang='scss'>
@import '~global';

.world {
  width: 100%;
  height: 100%;
  position: absolute;
}
.sky {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.container {
  width: 100%;
  height: 100%;
  position: absolute;
}
.nav-btn {
  position: absolute;
  top: calc(50% - 4rem);
  width: 8rem;
  height: 8rem;
  cursor: pointer;
  box-shadow: $shadow;
  &:hover {
    box-shadow: $shadow-hover;
  }
}
.btn-prev {
  left: 3rem;
  background: $color-white url('../../../assets/icons/arrowPrev.svg') 0 center / 80% no-repeat;
}
.btn-next {
  right: 3rem;
  background: $color-white url('../../../assets/icons/arrowNext.svg') 80% center / 80% no-repeat;
}
</style>
