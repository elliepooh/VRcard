<template lang='pug'>
  .dashboard
    header.dashboard__header
      .logo.header__logo
        a.logo__link
        h1.logo__title IMENGINE
      .header__profile
        h2.profile__name
        .profile__avatar
          img.profile__img
    .dashboard__gallery
      .gallery__card
        figure.card__preview
          img.card__img
        .card__content
          h3.card__title
          p.cart__text
        .card__actions
          a.btn-circle.card__btn-view
          a.btn-circle.card__btn-settings
    a.btn-circle.dashboard__btn-add
</template>

<script>
export default {
  name: 'dashboard',
  props: ['user'],
};
</script>

<style lang='scss'>
.dashboard {
  background-color: #F3F3F3;
}
.dashboard__header {
  background-color: #6543DD;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashboard__gallery {
  padding: 5rem;
}
</style>
