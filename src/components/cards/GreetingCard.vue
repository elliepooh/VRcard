<template lang='pug'>
  .card
    keep-alive
      component(:is='currentCard')
    .nav-arrow
      a.nav-btn(@click='changeCard(true)')
      a.nav-btn(@click='changeCard(false)')
</template>

<script>
import Chameleon from './greeting/Chameleon';
import Saturn from './greeting/Saturn';

export default {
  name: 'greetingCard',
  components: {
    Chameleon,
    Saturn,
  },
  data() {
    return {
      cards: [
        'Chameleon',
        'Saturn',
      ],

      currentIndex: 0,
      currentCard: 'Chameleon',
    };
  },
  methods: {
    changeCard(prev) {
      if (prev) {
        this.currentIndex = this.currentIndex === 0 ?
          this.cards.length - 1 : this.currentIndex - 1;
      } else {
        this.currentIndex = this.currentIndex + 1 === this.cards.length ?
          0 : this.currentIndex + 1;
      }
      this.currentCard = this.cards[this.currentIndex];
    },
  },
};
</script>

<style lang='scss'>
@import '~global';

.card {
  width: 100%;
  height: 100%;
  position: relative;
}
.nav-arrow {
  position: absolute;
  top: calc(50% - 4rem);
  left: 3rem;
  width: calc(100% - 6rem);
  display: flex;
  justify-content: space-between;
}
.nav-btn {
  width: 8rem;
  height: 8rem;
  cursor: pointer;
  box-shadow: $shadow;
  &:first-of-type {
    background: $color-white url('../../assets/icons/arrowPrev.svg') 0 center / 80% no-repeat;
  }
  &:last-of-type {
    background: $color-white url('../../assets/icons/arrowNext.svg') 80% center / 80% no-repeat;
  }
  &:hover {
    box-shadow: $shadow-hover;
  }
}
</style>
