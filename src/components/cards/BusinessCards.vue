<template lang='pug'>
  .card
    a.nav-btn.btn-prev(@click='prevCard')
    a.nav-btn.btn-next(@click='nextCard')

    component(:is='currentCard')
</template>

<script>
import 'aframe';
import CityCard from './business/CityCard';

export default {
  name: 'businessCards',
  components: {
    CityCard,
  },
  data() {
    return {
      cards: [
        'CityCard',
      ],

      currentCard: 'CityCard',
    };
  },
  methods: {
    prevCard() {},
    nextCard() {},
  },
};
</script>

<style lang='scss' scoped>
@import '~global';

.card {
  width: 100%;
  height: 100%;
  position: relative;
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
  background: $color-white url('../../assets/icons/arrowPrev.svg') 0 center / 80% no-repeat;
}
.btn-next {
  right: 3rem;
  background: $color-white url('../../assets/icons/arrowNext.svg') 80% center / 80% no-repeat;
}
</style>
