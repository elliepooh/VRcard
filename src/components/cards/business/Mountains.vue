<template lang='pug'>
  a-scene
    a-assets
      img#mountains(src='~@/assets/panoramas/mountains.jpg')
      img#photo(src='~@/assets/panoramas/mountains-photo.jpg')
      img#twitter(src='~@/assets/panoramas/socials/twitter.png')
      img#facebook(src='~@/assets/panoramas/socials/facebook.png')
      img#instagram(src='~@/assets/panoramas/socials/instagram.png')
      img#email(src='~@/assets/panoramas/socials/email.png')

      a-mixin#social(class='link' geometry='primitive: circle; radius: 0.07'
                    material='color: #0083B7; transparent: true')

    a-entity(geometry='primitive: plane; width: 2.8; height: 1.4' position='0 2 0'
            material='color: #DEF3FC')

      a-circle(radius='0.4' position='0.8 0 0.01' src='#photo')

      a-text(value='Andrew Oliver' color='#4B5154' width='4' position='-1.2 0.2 0.01')

      a-plane(width='1' height='0.4' position='-0.4 -0.1 0.01' transparent='true' opacity='0')
        a-text(value='I speak through my images. Photographer and creative soul.'
              color='#4B5154' anchor='center' width='1.6')

      a-plane(width='0.8' height='0.2' position='-0.85 -0.33 0.01' transparent='true' opacity='0')
        a-entity(mixin='social' material='src: #twitter' position='-0.3 0 0.01')
        a-entity(mixin='social' material='src: #facebook' position='-0.1 0 0.01')
        a-entity(mixin='social' material='src: #instagram' position='0.1 0 0.01')
        a-entity(mixin='social' material='src: #email' position='0.3 0 0.01')

    a-sky(radius='10' src='#mountains')
    a-entity(position='0 2 2')
      a-entity(camera look-controls wasd-controls)
        a-cursor(fuse='true')
</template>

<script>
export default {
  name: 'mountains',
};
</script>
