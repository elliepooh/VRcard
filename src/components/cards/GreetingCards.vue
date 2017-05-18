<template lang='pug'>
  .card
    .world(@click='showMessage = false')
    .letter(@click='openLetter')
    a.nav-btn.btn-prev(@click='prevCard')
    a.nav-btn.btn-next(@click='nextCard')
    transition(name='flip')
      .message(v-if='showMessage')
        .message-info
          span From: Neo
          span To: Mr. Smith
        h2.message-title Happy birthday!
        p.message-description
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          | eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          | ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
</template>

<script>
import ChameleonCard from './greeting/ChameleonCard';
import SaturnCard from './greeting/SaturnCard';
import SheepCard from './greeting/SheepCard';
import WatermelonCard from './greeting/WatermelonCard';
import FireflyCard from './greeting/FireflyCard';

import Letter from './greeting/Letter';

export default {
  name: 'greetingCards',
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

<style lang='scss' scoped>
@import '~global';

@import url('https://fonts.googleapis.com/css?family=Open+Sans:300i,400&subset=cyrillic');
@import url('https://fonts.googleapis.com/css?family=Playfair+Display&subset=cyrillic');


$line-color: rgba(37, 189, 232, 0.3);

.card {
  width: 100%;
  height: 100%;
  position: relative;
  font-family: 'Open Sans', sans-serif;
}
.world {
  width: 100%;
  height: 100%;
  position: absolute;
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
  cursor: pointer;
}
.message {
  width: 50rem;
  padding: 4rem;
  position: absolute;
  top: calc(50% - 25rem);
  left: 0;
  background-color: $color-white;
  border-radius: $border-radius;
  color: $color-dark;
}
.message-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  font-style: italic;
  font-weight: 300;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 10%;
    border-bottom: 2px solid $line-color;
  }
}
.message-title {
  font-family: 'Playfair Display', serif;
  margin-bottom: 2rem;
  font-size: 4rem;
  letter-spacing: 0.2rem;
}
.message-description {
  line-height: 3rem;
  background-image: linear-gradient(transparent 2.8rem, $line-color 2px);
  background-size: 100% 3rem;
}
.flip-enter-active,
.flip-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  transform-origin: 0% 50%;
}
.flip-enter-active {
  animation-name: flip-open;
}
.flip-leave-active {
  animation-name: flip-close;
}
@keyframes flip-open {
  0% {
    transform: perspective(1000px) rotate3d(0, 1, 0, 90deg);
  }
  100% {
    transform: perspective(1000px) rotate3d(0, 1, 0, 0deg);
  }
}
@keyframes flip-close {
  0% {
    transform: perspective(1000px) rotate3d(0, 1, 0, 0deg);
  }
  100% {
    transform: perspective(1000px) rotate3d(0, 1, 0, 90deg);
  }
}
</style>
