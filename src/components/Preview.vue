<template lang='pug'>
  .preview
    header.header
      .logo
        a.logo-img
        h1.logo-title IMENGINE
      .switch-box
        span.switch-label Greeting
        .switch-slider
          .switch-point(:class='{ "switch-business": showBusinessCards }'
            @click='switchCardType')
        span.switch-label Business
    .nav-arrow
      a.nav-btn
      a.nav-btn
    router-view
</template>

<script>
import router from '@/router';

export default {
  name: 'preview',
  data() {
    return {
      showBusinessCards: false,
    };
  },
  created() {
    router.push({ name: 'greeting-card' });
  },
  methods: {
    switchCardType() {
      const routerName = this.showBusinessCards ? 'business-card' : 'greeting-card';
      router.push({ name: routerName });
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~global';

$shadow: 0px 8px 22px rgba(0, 0, 0, 0.3);

.header {
  position: absolute;
  top: 3rem;
  left: 3rem;
  width: calc(100% - 6rem);
  display: flex;
  justify-content: space-between;
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
.switch-business + .switch-point::before {
  transform: translateX(3.2rem);
}
.switch-business + .switch-point::after {
  transform: translateX(3.2rem);
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
  background: $color-white url('../assets/icons/arrow.svg') center 80% / 80% no-repeat;
  cursor: pointer;
  &:first-of-type {
    transform: rotate(-90deg);
    box-shadow: -4px 4px 22px rgba(0, 0, 0, 0.3);
  }
  &:last-of-type {
    transform: rotate(90deg);
    box-shadow: 4px 4px 22px rgba(0, 0, 0, 0.3);
  }
}
</style>
