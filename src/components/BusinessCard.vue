<template lang='pug'>
  .business-card
    a-scene
      a-assets

      a-entity.info(geometry='primitive: plane; width: 1.8; height: 2'
      material='color: #FFF' position='0 2 0')
        a-plane.info-photo(width='1.8' position='0 0.7 0.01')

      a-sky(radius='10')
      a-entity(position='0 2 2')
        a-entity(camera look-controls)

    .card-nav
      a.nav-link(@click='prevSlide') Prev
      a.nav-link(@click='nextSlide') Next
</template>

<script>
import Firebase from '@/appconfig/firebase';
import robotoFont from '@/assets/fonts/roboto.fnt';
import robotoPng from '@/assets/fonts/roboto.png';

export default {
  name: 'businessCard',
  data() {
    return {
      sceneEl: null,
      skyEl: null,
      infoEl: null,
      panoramas: ['mountains', 'city', 'winter'],
      slide: 0,
      fontColor: '#797979',
      name: '',
      description: '',
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
      Firebase.profilePhotosRef.child('test.jpg').getDownloadURL().then((url) => {
        const img = document.createElement('img');
        img.setAttribute('src', url);
        img.setAttribute('id', 'photo');
        this.$el.querySelector('a-assets').appendChild(img);
      });
    });
  },
  mounted() {
    this.sceneEl = this.$el.querySelector('a-scene');
    this.infoEl = this.$el.querySelector('.info');
    Firebase.dbBusinessRef.child('test').once('value').then((snapshot) => {
      this.name = snapshot.val().name;
      this.description = snapshot.val().description;

      this.createCard();
    });
  },
  methods: {
    setPanorama() {
      const id = this.panoramas[this.slide];
      this.sceneEl.querySelector('a-sky').setAttribute('src', `#${id}`);
      this.sceneEl.querySelector('.info-photo').setAttribute('src', '#photo');
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
    createCard() {
      const nameText = document.createElement('a-entity');
      nameText.setAttribute('text', {
        color: '#000',
        value: this.name,
        width: 2,
        side: 'double',
        font: robotoFont,
        fontImage: robotoPng,
      });
      nameText.setAttribute('position', { x: 0.3, y: 0, z: 0.01 });
      this.infoEl.appendChild(nameText);

      const descriptionText = document.createElement('a-entity');
      descriptionText.setAttribute('text', {
        color: this.fontColor,
        value: this.description,
        width: 1.5,
        side: 'double',
        letterSpacing: 1,
        font: robotoFont,
        fontImage: robotoPng,
      });
      descriptionText.setAttribute('position', { x: 0.05, y: -0.5, z: 0.01 });
      this.infoEl.appendChild(descriptionText);
    },
  },
};
</script>

<style>
.business-card {
  width: 100%;
  height: 100%;
  position: absolute;
}
.card-nav {
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
}
</style>
