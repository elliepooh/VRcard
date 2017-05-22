<template lang='pug'>
  .card
    a.nav-btn.btn-prev(@click='prevCard')
    a.nav-btn.btn-next(@click='nextCard')

    component(:is='currentCard')
</template>

<script>
import 'aframe';
import CityCard from './business/CityCard';
import MountainsCard from './business/MountainsCard';
import WinterCard from './business/WinterCard';
import FieldCard from './business/FieldCard';

export default {
  name: 'businessCards',
  components: {
    CityCard,
    MountainsCard,
    WinterCard,
    FieldCard,
  },
  data() {
    return {
      cards: [
        'CityCard',
        'MountainsCard',
        'WinterCard',
        'FieldCard',
      ],

      currentIndex: 2,
      currentCard: 'WinterCard',
    };
  },
  methods: {
    prevCard() {
      this.currentIndex = this.currentIndex === 0 ?
        this.cards.length - 1 : this.currentIndex - 1;
      this.currentCard = this.cards[this.currentIndex];
    },
    nextCard() {
      this.currentIndex = this.currentIndex === this.cards.length - 1 ?
        0 : this.currentIndex + 1;
      this.currentCard = this.cards[this.currentIndex];
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
