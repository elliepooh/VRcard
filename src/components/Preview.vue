<template lang='pug'>
  .preview
    header.header
      .logo
        a.logo-img
        h1.logo-title IMENGINE
      .switch-box
        span.switch-label Greeting
        .switch-slider(:class='{ "switch-business": currentCardType === "BusinessCards" }')
          .switch-point(@click='switchCardType')
        span.switch-label Business
      router-link.dashboard-link(to='/signin')
    transition(name='slide' mode='out-in')
      component(:is='currentCardType')
</template>

<script>
import GreetingCards from './cards/GreetingCards';
import BusinessCards from './cards/BusinessCards';

export default {
  name: 'preview',
  components: {
    GreetingCards,
    BusinessCards,
  },
  data() {
    return {
      currentCardType: 'GreetingCards',
    };
  },
  methods: {
    switchCardType() {
      if (this.currentCardType === 'GreetingCards') {
        this.currentCardType = 'BusinessCards';
      } else {
        this.currentCardType = 'GreetingCards';
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~global';

.preview {
  width: 100%;
  height: 100%;
  background-color: $color-main;
}
.header {
  position: absolute;
  top: 3rem;
  left: 3rem;
  width: calc(100% - 6rem);
  display: flex;
  justify-content: space-between;
  z-index: 200;
}
.switch-box {
  position: absolute;
  top: 0rem;
  left: calc(50% - 18rem);
  background-color: $color-white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
  height: 6rem;
  border-radius: 3rem;
  padding: 0 3rem;
  box-shadow: $shadow;
}
.switch-label {
  color: $color-darkgray;
  font-size: 2rem;
  font-weight: 400;
  text-transform: uppercase;
}
.switch-slider {
  position: relative;
  width: 6rem;
  height: 2.6rem;
  border-radius: 3rem;
}
.switch-point {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lighten($color-main, 20);
  transition: .4s ease-in;
  border-radius: 3rem;
  &::after {
    content: '';
    position: absolute;
    width: 1.8rem;
    height: 1.8rem;
    left: 0.5rem;
    bottom: 0.5rem;
    background-color: $color-white;
    border-radius: 50%;
    transition: .4s ease-in;
  }
  &::before {
    content: '';
    position: absolute;
    width: 3.2rem;
    height: 3.2rem;
    left: -0.2rem;
    bottom: -0.2rem;
    background-color: $color-main;
    border-radius: 50%;
    transition: .4s ease-in;
  }
}
.switch-business > .switch-point::before {
  transform: translateX(3.2rem);
}
.switch-business > .switch-point::after {
  transform: translateX(3.2rem);
}
.dashboard-link {
  width: 5rem;
  height: 5rem;
  background: url('../assets/icons/dashboard.svg') no-repeat center / contain;
}
</style>
