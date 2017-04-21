<template lang='pug'>
  .gallery
    .card(v-for='card in numOfCards')
      figure.card-preview
        img.card-img
      .card-content
        h3.card-title
        p.cart-text
      a.btn.btn-view
</template>

<script>
// import Firebase from '@/appconfig/firebase';

export default {
  name: 'gallery',
  props: ['numOfCards'],
  data() {
    return {

    };
  },
  methods: {
    addBusinessCard() {
      if (this.limit > 0) {
        this.numOfCards += 1;
        this.limit -= 1;
        this.userRef.child('cardLimit').set(this.limit);
        this.showSettings = true;
      } else {
        this.showCardLimit();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~style';

.gallery {
  height: calc(100vh - 10rem);
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.card {
  width: 70%;
  height: 60%;
  box-shadow: $shadow;
  border-radius: $border-radius;
  display: flex;
  position: relative;
}
.card-preview {
  flex: 1;
  background-color: $color-gray;
}
.card-content {
  flex: 1;
  background-color: $color-white;
}
.btn-view {
  position: absolute;
  bottom: 3rem;
  left: calc(50% - 12rem);
  width: 6rem;
  height: 6rem;
  background-image: url('../../assets/icons/eye.svg');
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
}
</style>
