<template lang='pug'>
  a-scene
    a-assets
      img#city(src='~@/assets/panoramas/city.jpg')
      img#photo(src='~@/assets/panoramas/city-photo.jpg')
      img#twitter(src='~@/assets/panoramas/socials/twitter.png')
      img#facebook(src='~@/assets/panoramas/socials/facebook.png')
      img#instagram(src='~@/assets/panoramas/socials/instagram.png')
      img#email(src='~@/assets/panoramas/socials/email.png')

      a-mixin#social(class='link' geometry='primitive: circle; radius: 0.06' material='color: #6B849C')

    a-entity(geometry='primitive: plane; width: 1.8; height: 2'
            material='color: #FFF' position='0 1.8 0')

      a-plane(width='1.8' height='0.9' position='0 0.7 0.01' src='#photo')
      a-text(value='Alice Storm' color='#4B5154' width='4' position='-0.45 0 0.01')

      a-plane(width='1.6' height='0.4' position='0 -0.35 0.01')
        a-text(value='Freelance photographer and illustrator. Love eating muffins, creating fabulous things and never get tired of this.'
              color='#697982' anchor='center' width='1.6')

      a-plane(width='1.6' height='0.01' position='0 -0.6 0.01'
              color='#697982' opacity='0.3')

      a-plane(width='1.6' height='0.2' position='0 -0.8 0')
        a-entity(mixin='social' material='src: #twitter' position='-0.3 0 0.01')
        a-entity(mixin='social' material='src: #facebook' position='-0.1 0 0.01')
        a-entity(mixin='social' material='src: #instagram' position='0.1 0 0.01')
        a-entity(mixin='social' material='src: #email' position='0.3 0 0.01')

    a-sky(radius='10' src='#city')
    a-entity(position='0 2 2')
      a-entity(camera look-controls wasd-controls)
        a-cursor(fuse='true')
</template>

<script>
export default {
  name: 'cityCard',
};
</script>
