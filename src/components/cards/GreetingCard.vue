<template lang='pug'>
  .card
    .world
    .letter(@click='openLetter')
    a.nav-btn.btn-prev(@click='prevCard')
    a.nav-btn.btn-next(@click='nextCard')
    .message(v-if='showMessage')
</template>

<script>
import ChameleonCard from './greeting/ChameleonCard';
import SaturnCard from './greeting/SaturnCard';
import SheepCard from './greeting/SheepCard';
import WatermelonCard from './greeting/WatermelonCard';
import FireflyCard from './greeting/FireflyCard';

import Letter from './greeting/Letter';

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

      worldContainer: null,
      index: 0,
      card: null,

      letter: null,
      showMessage: false,
    };
  },
  mounted() {
    this.worldContainer = this.$el.querySelector('.world');
    this.card = new this.cards[this.index](this.worldContainer);
    this.card.animate();

    const letterContainer = this.$el.querySelector('.letter');
    this.letter = new Letter(letterContainer);
    this.letter.animate();
  },
  methods: {
    prevCard() {
      this.index = this.index === 0 ? this.cards.length - 1 : this.index - 1;
      this.createCard();
    },
    nextCard() {
      this.index = this.index + 1 === this.cards.length ? 0 : this.index + 1;
      this.createCard();
    },
    createCard() {
      this.worldContainer.innerHTML = '';
      this.card = new this.cards[this.index](this.worldContainer);
    },
    openLetter() {
      this.letter.open();
      this.showMessage = !this.showMessage;
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
.world {
  width: 100%;
  height: 100%;
  position: absolute;
}
.message-box {
  position: absolute;
  top: 20%;
  left: 20rem;
  display: flex;
  flex-direction: column;
  border-radius: $border-radius * 2;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 3rem;
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
.letter {
  position: absolute;
  width: 20rem;
  height: 25rem;
  bottom: 8rem;
  left: 8rem;
}
.message {
  width: 40rem;
  height: 30rem;
  background-color: #ffffff;
  position: absolute;
  top: calc(50% - 15rem);
  left: calc(50% - 20rem);
}
</style>
