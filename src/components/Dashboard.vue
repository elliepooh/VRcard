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
      .dashboard__actions
        .actions__add
          a.actions__btn.btn--add
          a.actions__btn.btn--business
          a.actions__btn.btn--greeting
        a.actions__btn.btn--preview
      .gallery__card
        figure.card__preview
          img.card__img
        .card__content
          h3.card__title
          p.cart__text
        .card__actions
          a.btn-circle.card__btn-view
      nav.dashboard__settings
        a.settings__btn.btn--home.settings__btn--active
        a.settings__btn.btn--basic
        a.settings__btn.btn--person
        a.settings__btn.btn--company
    nav.dashboard__pagination
      a.pagination__point(v-for='point in points')
</template>

<script>
import Firebase from '@/appconfig/firebase';

export default {
  name: 'dashboard',
  props: ['user'],
  data() {
    return {
      userRef: null,
      limit: 0,
      points: 0,
    };
  },
  created() {
    this.userRef = Firebase.dbUsersRef.child(this.convertEmail(this.user.email));
    this.checkCardLimit();
  },
  methods: {
    addCard() {
      if (this.limit > 0) {
        this.points += 1;
        this.limit -= 1;
        this.userRef.child('cardLimit').set(this.limit);
      } else {
        // TODO: add notification
      }
    },
    checkCardLimit() {
      this.userRef.once('value').then((snapshot) => {
        this.limit = snapshot.val().cardLimit;
      });
    },
    convertEmail(email) {
      return email.toLowerCase().replace(/@/g, '').replace(/\./g, '');
    },
  },
};
</script>

<style lang='scss'>
$color: #6543DD;
$shadow: 0px 8px 22px rgba(0, 0, 0, 0.4);
$border-radius: 3px;

.dashboard {
  background-color: #F3F3F3;
}
.dashboard__header {
  background-color: $color;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashboard__gallery {
  padding: 10rem 3rem;
}
.dashboard__actions {
  width: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.actions__add,
.actions__btn-preview {
  box-shadow: $shadow;
  border-radius: $border-radius;
}
.actions__btn {
  cursor: pointer;
}
.btn--add {
  background: #fff url('../assets/img/plus.svg') center / 70% no-repeat;
}
.btn--business {
  background: #fff url('../assets/img/business.svg') center / 70% no-repeat;
}
.btn--greeting {
  background: #fff url('../assets/img/greeting.svg') center / 70% no-repeat;
}
.btn--preview {
  background: #fff url('../assets/img/preview.svg') center / 70% no-repeat;
}
.dashboard__settings {
  width: 8rem;
  display: flex;
  flex-direction: column;
  box-shadow: $shadow;
  border-radius: $border-radius;
  background-color: #fff;
}
.settings__btn {
  display: block;
  height: 8rem;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}
.settings__btn--active {
  opacity: 1;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 0.8rem;
    height: 4rem;
    top: 2rem;
    right: 0;
    background-color: $color;
  }
}
.btn--home {
  background: url('../assets/img/home.svg') center / 50% no-repeat;
}
.btn--basic {
  background: url('../assets/img/settings.svg') center / 50% no-repeat;
}
.btn--person {
  background: url('../assets/img/account.svg') center / 50% no-repeat;
}
.btn--company {
  background: url('../assets/img/company.svg') center / 50% no-repeat;
}
</style>
