<template lang='pug'>
  .land
    a-scene
      a-assets
        img(id='sechelt' src='https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg')

      a-sky(radius='10' src='#sechelt')

      a-camera
        a-cursor(id='cursor')
          a-animation(begin='click' easing='ease-in' attribute='scale'
          fill='backwards' from='0.1 0.1 0.1' to='1 1 1' dur='150')
          a-animation(begin='cursor-fusing' easing='ease-in' attribute='scale'
          from='1 1 1' to='0.1 0.1 0.1' dur='1500')
</template>

<script>
export default {
  name: 'land',
};
</script>

<style>
.land {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
