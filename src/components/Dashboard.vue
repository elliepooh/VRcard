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
      transition(name='show-notification')
        .dashboard__notification(v-if='showMessage') You have {{ limit }} cards limit
      .dashboard__actions
        .actions__add
          a.dashboard__btn.btn-add(@click='addCard'
        v-bind:class='{ "btn-add--active": chooseCard }')
        transition-group(name='toggle-choose' tag='div')
          a.dashboard__btn.btn-business(v-if='chooseCard' @click='addBusinessCard' key='business')
          a.dashboard__btn.btn-greeting(v-if='chooseCard' @click='addGreetingCard' key='greeting')
        a.dashboard__btn.btn-preview
      .gallery__card(v-for='card in activeCards')
        figure.card__preview
          img.card__img
        .card__content
          h3.card__title
          p.cart__text
        a.card__btn-view
      nav.dashboard__settings
        a.dashboard__btn.btn-home.dashboard__btn--active
        a.dashboard__btn.btn-basic
        a.dashboard__btn.btn-person
        a.dashboard__btn.btn-company
    nav.dashboard__pagination
      a.pagination__point(v-for='card in activeCards')
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
      activeCards: 1,
      chooseCard: false,
      showMessage: false,
    };
  },
  mounted() {
    this.userRef = Firebase.dbUsersRef.child(this.convertEmail(this.user.email));
    this.checkCardLimit();
  },
  methods: {
    addCard() {
      if (this.limit > 0) {
        this.chooseCard = !this.chooseCard;
        this.showMessage = !this.showMessage;
      } else {
        this.showMessage = true;
      }
    },
    addBusinessCard() {
      if (this.limit > 0) {
        this.activeCards += 1;
        this.limit -= 1;
        this.userRef.child('cardLimit').set(this.limit);
      } else {
        this.showMessage = true;
      }
    },
    addGreetingCard() {
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
  height: 15vh;
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashboard__gallery {
  height: 85vh;
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.dashboard__notification {
  position: absolute;
  width: 30rem;
  top: 3rem;
  left: calc(50% - 15rem);
  text-align: center;
  background-color: $color;
  border-radius: $border-radius;
  color: #fff;
  padding: 1.5rem 0;
}
.dashboard__actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60%;
  width: 8rem;
}
.actions__add,
.btn-preview {
  box-shadow: $shadow;
  border-radius: $border-radius;
  background-color: #fff;
}
.dashboard__btn {
  display: block;
  cursor: pointer;
  height: 8rem;
  opacity: 0.8;
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  &:hover {
    opacity: 1;
  }
}
.dashboard__btn--active {
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
.show-notification-enter-active,
.show-notification-leave-active,
.toggle-choose-enter-active,
.toggle-choose-leave-active, {
  transition: all .5s ease;
}
.show-notification-enter,
.show-notification-leave-to {
  transform: translateY(-8rem);
  color: $color;
}
.toggle-choose-enter,
.toggle-choose-leave-to {
  transform: translateY(-8rem);
  opacity: 0;
}
.btn-add {
  background-image: url('../assets/img/plus.svg');
  background-size: 70%;
  transition: .3s ease-in;
}
.btn-add--active {
  transform: rotate(45deg);
}
.btn-business {
  background-image: url('../assets/img/business.svg');
  background-color: #fff;
}
.btn-greeting {
  background-image: url('../assets/img/greeting.svg');
  background-color: #fff;
}
.btn-preview {
  background-image: url('../assets/img/preview.svg');
  opacity: 1;
}
.dashboard__settings {
  width: 8rem;
  box-shadow: $shadow;
  border-radius: $border-radius;
  background-color: #fff;
}
.btn-home {
  background-image: url('../assets/img/home.svg');
}
.btn-basic {
  background-image: url('../assets/img/settings.svg');
}
.btn-person {
  background-image: url('../assets/img/account.svg');
}
.btn-company {
  background-image: url('../assets/img/company.svg');
}
.gallery__card {
  width: 70%;
  height: 60%;
  box-shadow: $shadow;
  border-radius: $border-radius;
  display: flex;
  position: relative;
}
.card__preview {
  flex: 1;
  background-color: #e0e0e0;
}
.card__content {
  flex: 1;
  background-color: #fff;
}
.card__btn-view {
  position: absolute;
  bottom: 3rem;
  left: calc(50% - 12rem);
  width: 6rem;
  height: 6rem;
  background: $color url('../assets/img/eye.svg') center / 50% no-repeat;
  box-shadow: $shadow;
  border-radius: 50%;
  cursor: pointer;
}
</style>
