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
        .profile__more(@click='showProfileMenu = !showProfileMenu')
          .profile__menu(v-if='showProfileMenu')
            a.menu-item(@click='showProfileModal = true') Settings
            a.menu-item Log out
    .dashboard__gallery
      transition(name='show-notification')
        .dashboard__notification(v-if='showMessage') You have {{ limit }} cards limit
      transition(name='toggle-actions')
        .dashboard__actions(v-if='!showSettings')
          .actions__add
            a.dashboard__btn.btn-add(@click='addCard'
          v-bind:class='{ "btn-add--active": chooseCard }')
          transition-group(name='toggle-choose' tag='div')
            a.dashboard__btn.btn-business(v-if='chooseCard' @click='addBusinessCard' key='business')
            a.dashboard__btn.btn-greeting(v-if='chooseCard' @click='addGreetingCard' key='greeting')
          a.dashboard__btn.btn-preview(href='preview-business' target='_blank')
      transition(name='toggle-cards')
        .gallery__card(v-if='!showSettings' v-for='card in numOfCards')
          figure.card__preview
            img.card__img
          .card__content
            h3.card__title
            p.cart__text
          a.card__btn-view
      nav.dashboard__settings
        a.dashboard__btn.btn-home.dashboard__btn--active
        a.dashboard__btn.btn-settings(@click='showSettings = !showSettings')

      .dashboard__overlay(v-if='showProfileModal' @click='showProfileModal = false')
      .dashboard__modal(v-if='showProfileModal')
        .modal__profile-info
          .profile-info__img
            img
          a.btn.profile-info__upload Upload
          input.profile-info__name
          a.profile-info__delete Delete account?
        .modal__profile-settings
          .profile-settings__email
            .profile-settings__title Change your email
            input.profile-settings__input(placeholder='Old email'
            name='email' type='email' v-model='oldEmail')
            input.profile-settings__input(placeholder='New email'
            name='email' type='email' v-model='newEmail')
            a.btn.profile-settings__btn Accept
          .profile-settings__password
            .profile-settings__title Change your password
            input.profile-settings__input(placeholder='Old password'
            name='password' type='password' v-model='oldPassword')
            input.profile-settings__input(placeholder='New password'
            name='password' type='password' v-model='newPassword')
            a.btn.profile-settings__btn Accept

    nav.dashboard__pagination
      a.pagination__point(v-for='card in numOfCards')
</template>

<script>
import Firebase from '@/appconfig/firebase';

export default {
  name: 'dashboard',
  data() {
    return {
      user: null,
      userRef: null,
      limit: 0,
      numOfCards: 0,
      chooseCard: false,
      showMessage: false,
      showSettings: false,
      showProfileMenu: false,
      showProfileModal: false,
      oldEmail: '',
      newEmail: '',
      oldPassword: '',
      newPassword: '',
    };
  },
  mounted() {
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.userRef = Firebase.dbUsersRef.child(this.user.uid);
        this.checkUserData();
      }
    });
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
        this.numOfCards += 1;
        this.limit -= 1;
        this.userRef.child('cardLimit').set(this.limit);
        this.showSettings = true;
      } else {
        this.showMessage = true;
      }
    },
    addGreetingCard() {
    },
    checkUserData() {
      this.userRef.once('value').then((snapshot) => {
        this.limit = snapshot.val().cardLimit;
        if (snapshot.val().cards) {
          this.numOfCards = snapshot.val().cards.length;
        }
      });
    },
  },
};
</script>

<style lang='scss'>
$color-main: #6543DD;
$color-grey: #D8D8D8;
$shadow: 0px 8px 22px rgba(0, 0, 0, 0.4);
$border-radius: 3px;

.dashboard {
  background-color: #F3F3F3;
}
.dashboard__header {
  background-color: $color-main;
  height: 10rem;
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashboard__gallery {
  height: calc(100vh - 10rem);
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
  background-color: $color-main;
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
    background-color: $color-main;
  }
}
.show-notification-enter-active,
.show-notification-leave-active,
.toggle-choose-enter-active,
.toggle-choose-leave-active,
.toggle-actions-enter-active,
.toggle-actions-leave-active,
.toggle-cards-enter-active,
.toggle-cards-leave-active {
  transition: all .5s ease;
}
.show-notification-enter,
.show-notification-leave-to {
  transform: translateY(-8rem);
  color: $color-main;
}
.toggle-choose-enter,
.toggle-choose-leave-to {
  transform: translateY(-8rem);
  opacity: 0;
}
.toggle-actions-enter,
.toggle-actions-leave-to {
  transform: translateX(-8rem);
}
.toggle-cards-enter,
.toggle-cards-leave-to {
  transform: translateY(-10rem);
}
.btn-add {
  background-image: url('../assets/icons/plus.svg');
  background-size: 70%;
  transition: .3s ease-in;
}
.btn-add--active {
  transform: rotate(45deg);
}
.btn-business {
  background-image: url('../assets/icons/business.svg');
  background-color: #fff;
}
.btn-greeting {
  background-image: url('../assets/icons/greeting.svg');
  background-color: #fff;
}
.btn-preview {
  background-image: url('../assets/icons/preview.svg');
  opacity: 1;
}
.dashboard__settings {
  width: 8rem;
  box-shadow: $shadow;
  border-radius: $border-radius;
  background-color: #fff;
}
.btn-home {
  background-image: url('../assets/icons/home.svg');
}
.btn-settings {
  background-image: url('../assets/icons/settings.svg');
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
  background: $color-main url('../assets/icons/eye.svg') center / 50% no-repeat;
  box-shadow: $shadow;
  border-radius: 50%;
  cursor: pointer;
}
.header__profile {
  display: flex;
}
.profile__more {
  width: 2rem;
  height: 5rem;
  background: url('../assets/icons/more.svg') center / cover no-repeat;
  position: relative;
  cursor: pointer;
}
.profile__menu {
  position: absolute;
  top: 5rem;
  right: 0;
  background-color: #fff;
  padding: 2rem;
  z-index: 110;
}
.menu-item {
  display: block;
  text-transform: uppercase;
  font-weight: 400;
  color: #000;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:first-of-type {
    margin-bottom: 1rem;
  }
}
.dashboard__overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
}
.dashboard__modal {
  position: absolute;
  width: 50rem;
  height: 36rem;
  top: calc(50% - 18rem);
  left: calc(50% - 25rem);
  background-color: #fff;
  box-shadow: $shadow;
  border-radius: $border-radius;
  z-index: 110;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__profile-info,
.modal__profile-settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
}
.modal__profile-info {
  border-right: 3px solid $color-grey;
}
.profile-info__img {
  width: 15rem;
  height: 15rem;
  background-color: $color-grey;
  border-radius: 50%;
  margin-bottom: 2rem;
}
.profile-info__upload {
  margin-bottom: 2rem;
}
.profile-settings__email,
.profile-settings__password {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-settings__input,
.profile-info__name {
  border: 0;
  outline: none;
}
.btn {
  width: 16rem;
  height: 4rem;
  background-color: $color-main;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 26px;
  font-size: 1.4rem;
  text-transform: uppercase;
  box-shadow: 0px 6px 14px rgba(101, 67, 221, 0.3);
  cursor: pointer;
  &:hover {
    box-shadow: 0px 6px 14px rgba(101, 67, 221, 0.6);
  }
}
</style>
