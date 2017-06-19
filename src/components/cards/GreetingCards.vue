<template lang='pug'>
  .card
    world(@click.native='showMessage = false')
    .letter(@click='openLetter')
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
import World from './greeting/World';
import Letter from './greeting/Letter';

export default {
  name: 'greetingCards',
  components: {
    World,
  },
  data() {
    return {
      letter: null,
      showMessage: false,
    };
  },
  mounted() {
    const letterContainer = this.$el.querySelector('.letter');
    this.letter = new Letter(letterContainer);
    this.letter.animate();
  },
  methods: {
    openLetter() {
      this.letter.open();
      this.showMessage = !this.showMessage;
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
</style>
