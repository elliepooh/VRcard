<template lang='pug'>
  .business-card
    a-scene
      a-assets
        img#panorama

      a-sky(radius='10' src='#panorama')

      a-camera
        a-cursor(id='cursor')
          a-animation(begin='click' easing='ease-in' attribute='scale'
          fill='backwards' from='0.1 0.1 0.1' to='1 1 1' dur='150')
          a-animation(begin='cursor-fusing' easing='ease-in' attribute='scale'
          from='1 1 1' to='0.1 0.1 0.1' dur='1500')
</template>

<script>
import Firebase from '@/appconfig/firebase';

export default {
  name: 'businessCard',
  mounted() {
    Firebase.panoramasRef.child('mountains.jpg').getDownloadURL().then((url) => {
      this.$el.querySelector('#panorama').setAttribute('src', url);
    });
  },
};
</script>

<style>
.business-card {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
