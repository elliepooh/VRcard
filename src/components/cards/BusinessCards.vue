<template lang='pug'>
  .card
    a.nav-btn.btn-prev(@click='prevCard')
    a.nav-btn.btn-next(@click='nextCard')

    component(:is='cards[index]')
</template>

<script>
import 'aframe';
import City from './business/City';
import Mountains from './business/Mountains';
import Winter from './business/Winter';

export default {
  name: 'businessCards',
  components: {
    City,
    Mountains,
    Winter,
  },
  data() {
    return {
      cards: [
        'City',
        'Mountains',
        'Winter',
      ],

      index: 0,
    };
  },
  methods: {
    prevCard() {
      this.index = this.index === 0 ? this.cards.length - 1 : this.index - 1;
    },
    nextCard() {
      this.index = this.index === this.cards.length - 1 ? 0 : this.index + 1;
    },
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
  z-index: 200;
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
