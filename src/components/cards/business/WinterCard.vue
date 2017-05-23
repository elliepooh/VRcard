<template lang='pug'>
  a-scene
    a-assets
      img#winter(src='~@/assets/panoramas/winter.jpg')
      img#photo(src='~@/assets/panoramas/owl.jpg')
      img#twitter(src='~@/assets/panoramas/socials/twitter.png')
      img#facebook(src='~@/assets/panoramas/socials/facebook.png')
      img#instagram(src='~@/assets/panoramas/socials/instagram.png')
      img#email(src='~@/assets/panoramas/socials/email.png')

      a-mixin#social(class='link' geometry='primitive: circle; radius: 0.08'
                    material='transparent: true')

    a-entity(geometry='primitive: plane; width: 3; height: 1.6' position='0 2 0'
            material='transparent: true; opacity: 0.7; color: #252D4C; side: double')

      a-text(value='LESTER WAY' color='#F7F5EA' width='4' position='-0.55 0.5 0.01'
            letter-spacing='2' font='exo2semibold')

      a-text(value='Lorem ipsum dolor sit amet, consectetur adipisicing elit,\
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
            color='#F7F5EA' anchor='center' width='2' align='center'
            letter-spacing='2' line-height='50' position='0 0 0.02')

      a-plane(width='0.5' height='0.01' position='0 -0.4 0.01'
              color='#F7F5EA' opacity='0.3')

      a-entity(mixin='social' material='src: #twitter;' position='-0.3 -0.6 0.01')
      a-entity(mixin='social' material='src: #facebook' position='-0.1 -0.6 0.01')
      a-entity(mixin='social' material='src: #instagram' position='0.1 -0.6 0.01')
      a-entity(mixin='social' material='src: #email' position='0.3 -0.6 0.01')

    a-sky(radius='10' src='#winter')
    a-entity(position='0 2 2')
      a-entity(camera look-controls wasd-controls)
        a-cursor(fuse='true')
</template>

<script>
import 'aframe-gradient-sky';

export default {
  name: 'winterCard',
  data() {
    return {};
  },
  methods: {},
};
</script>
