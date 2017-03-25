<template lang='pug'>
  .business-card
    a-scene
      a-assets

      a-sky(radius='10')

      a-plane(color='#000' position='0 2 -2' width='2.3' height='1')
      a-text(value='Hello World' position='0 2 -1' size='3' color='#fff')

      a-camera
        a-cursor(id='cursor')
          a-animation(begin='click' easing='ease-in' attribute='scale'
          fill='backwards' from='0.1 0.1 0.1' to='1 1 1' dur='150')
          a-animation(begin='cursor-fusing' easing='ease-in' attribute='scale'
          from='1 1 1' to='0.1 0.1 0.1' dur='1500')

    .card-nav
      a.nav-link(@click='prevSlide') Prev
      a.nav-link(@click='nextSlide') Next
</template>

<script>
import Firebase from '@/appconfig/firebase';

export default {
  name: 'businessCard',
  data() {
    return {
      panoramas: ['mountains', 'city', 'winter'],
      slide: 0,
    };
  },
  created() {
    this.panoramas.forEach((name) => {
      Firebase.panoramasRef.child(`${name}.jpg`).getDownloadURL().then((url) => {
        const img = document.createElement('img');
        img.setAttribute('src', url);
        img.setAttribute('id', name);
        this.$el.querySelector('a-assets').appendChild(img);
      });
    });
  },
  methods: {
    setPanorama() {
      const id = this.panoramas[this.slide];
      this.$el.querySelector('a-sky').setAttribute('src', `#${id}`);
    },
    nextSlide() {
      if (this.slide < (this.panoramas.length - 1)) {
        this.slide += 1;
      } else {
        this.slide = 0;
      }
      this.setPanorama();
    },
    prevSlide() {
      if (this.slide > 0) {
        this.slide -= 1;
      } else {
        this.slide = (this.panoramas.length - 1);
      }
      this.setPanorama();
    },
  },
};
</script>

<style>
.business-card {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #77D6CC;
}
.card-nav {
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
}
</style>
