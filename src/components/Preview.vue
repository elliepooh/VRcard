<template lang='pug'>
  .preview
    header.preview__header
      .logo.header__logo
        a.logo__link
        h1.logo__title IMENGINE
      .preview__switch-box
        span.switch__label Greeting
        label.switch
          input(type='checkbox' v-model='greetingCards')
          .switch__slider
        span.switch__label Business
      a.preview__close-btn(v-if='user')
    .preview__nav-arrow
      a.nav-arrow__btn
      a.nav-arrow__btn
    router-view
</template>

<script>
export default {
  name: 'preview',
  props: ['user'],
  data() {
    return {
      greetingCards: '',
    };
  },
};
</script>

<style lang='scss'>
$color: #6543DD;
$shadow: 0px 8px 22px rgba(0, 0, 0, 0.3);

.preview__header {
  position: absolute;
  top: 3rem;
  left: 3rem;
  width: calc(100% - 6rem);
  display: flex;
  justify-content: space-between;
}
.preview__switch-box {
  position: absolute;
  top: 0rem;
  left: calc(50% - 18rem);
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
  height: 6rem;
  border-radius: 3rem;
  padding: 0 3rem;
  box-shadow: $shadow;
}
.switch__label {
  color: #797979;
  font-size: 2rem;
  font-weight: 400;
  text-transform: uppercase;
}
.switch {
  position: relative;
  width: 6rem;
  height: 2.6rem;
  border-radius: 3rem;
  input {
    display: none;
  }
}
.switch__slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #AD99F9;
  transition: .4s ease-in;
  border-radius: 3rem;
  &::after {
    content: '';
    position: absolute;
    width: 1.8rem;
    height: 1.8rem;
    left: 0.5rem;
    bottom: 0.5rem;
    background-color: #fff;
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
    background-color: $color;
    border-radius: 50%;
    transition: .4s ease-in;
  }
}
input:checked + .switch__slider::before {
  transform: translateX(3.2rem);
}
input:checked + .switch__slider::after {
  transform: translateX(3.2rem);
}
.preview__close-btn {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: #fff url('../assets/icons/plus.svg') center / 80% no-repeat;
  cursor: pointer;
  transform: rotate(45deg);
  box-shadow: 4px 4px 22px rgba(0, 0, 0, 0.3);
}
.preview__nav-arrow {
  position: absolute;
  top: calc(50% - 4rem);
  left: 3rem;
  width: calc(100% - 6rem);
  display: flex;
  justify-content: space-between;
}
.nav-arrow__btn {
  width: 8rem;
  height: 8rem;
  background: #fff url('../assets/icons/arrow.svg') center 80% / 80% no-repeat;
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
