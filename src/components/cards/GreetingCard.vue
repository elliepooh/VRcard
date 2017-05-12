<template lang='pug'>
  .card
    a.nav-btn.btn-prev(@click='prevCard')
    a.nav-btn.btn-next(@click='nextCard')
</template>

<script>
import ChameleonCard from './greeting/ChameleonCard';
import SaturnCard from './greeting/SaturnCard';
import SheepCard from './greeting/SheepCard';
import WatermelonCard from './greeting/WatermelonCard';
import FireflyCard from './greeting/FireflyCard';

export default {
  name: 'greetingCard',
  data() {
    return {
      cards: [
        ChameleonCard,
        SaturnCard,
        SheepCard,
        WatermelonCard,
        FireflyCard,
      ],

      index: 0,
      card: null,
    };
  },
  mounted() {
    this.card = new this.cards[this.index](this.$el);
    this.card.animate();
  },
  methods: {
    prevCard() {
      this.index = this.index === 0 ? this.cards.length - 1 : this.index - 1;
      this.$el.removeChild(this.$el.children[2]);
      this.card = new this.cards[this.index](this.$el);
    },
    nextCard() {
      this.index = this.index + 1 === this.cards.length ? 0 : this.index + 1;
      this.$el.removeChild(this.$el.children[2]);
      this.card = new this.cards[this.index](this.$el);
    },
  },
  watch: {
    card() {
      this.card.animate();
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
