<template lang='pug'>
  .dashboard
    header.dashboard__header
      .logo.header__logo
        a.logo__link
        h1.logo__title IMENGINE
      .header__profile
        .profile__name {{ username }}
        .profile__avatar(:style='{ backgroundImage: `url(${userPhotoURL})` }'
        @click='showProfileModal = true')
        .profile__more(@click='showProfileMenu = !showProfileMenu')
          .profile__menu(v-if='showProfileMenu')
            a.menu-item(@click='showProfileModal = true') Settings
            a.menu-item(@click='logOut') Log out
    .dashboard__gallery
      transition(name='show-notification')
        .dashboard__notification(v-if='message' @click='message = ""') {{ message }}
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
          .profile-info__avatar(:style='{ backgroundImage: `url(${userPhotoURL})` }')
          input.profile-info__upload(name='photo' id='photo' type='file'
          @change='uploadPhoto')
          label.btn(for='photo') Upload photo
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
import router from '@/router';

export default {
  name: 'dashboard',
  data() {
    return {
      user: null,
      userRef: null,
      limit: 0,
      numOfCards: 0,
      message: '',
      chooseCard: false,
      showSettings: false,
      showProfileMenu: false,
      showProfileModal: false,
      userPhotoURL: '',
      username: '',
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
        this.userPhotoURL = this.user.photoURL;
        this.userRef = Firebase.dbUsersRef.child(this.user.uid);
        this.username = this.user.displayName;
        this.checkUserData();
      }
    });
  },
  methods: {
    addCard() {
      if (this.limit > 0) {
        this.chooseCard = !this.chooseCard;
        if (this.chooseCard) {
          this.showCardLimit();
        } else {
          this.message = '';
        }
      } else {
        this.showCardLimit();
      }
    },
    showCardLimit() {
      this.message = `You have ${this.limit} cards limit`;
    },
    addBusinessCard() {
      if (this.limit > 0) {
        this.numOfCards += 1;
        this.limit -= 1;
        this.userRef.child('cardLimit').set(this.limit);
        this.showSettings = true;
      } else {
        this.showCardLimit();
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
    uploadPhoto(event) {
      const file = event.target.files[0];
      if (file.size / 1024 > 2048) {
        this.message = 'Your image is too big. Maximal file size is 2MB.';
        return;
      }
      const storageFileRef = Firebase.profilePhotosRef.child(this.user.uid);
      const task = storageFileRef.put(file);
      task.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.message = `Upload is ${Math.round(progress)}% done`;
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              this.message = 'Sorry, but you don\'t have permission to upload files';
              break;
            case 'storage/canceled':
              this.message = 'You canceled the upload';
              break;
            default:
              this.message = error.code;
          }
        },
        () => {
          storageFileRef.getDownloadURL().then((url) => {
            this.user.updateProfile({
              photoURL: url,
            });
            this.userPhotoURL = url;
          });
          this.message = 'Upload is complete!';
        },
      );
    },
    logOut() {
      Firebase.auth.signOut();
      router.push('/');
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~style';

::-webkit-input-placeholder {
  color: $color-gray;
}
::-moz-placeholder {
  color: $color-gray;
}
:-ms-input-placeholder {
  color: $color-gray;
}
:-moz-placeholder {
  color: $color-gray;
}

.dashboard {
  background-color: $color-white;
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
  color: $color-white;
  padding: 1.5rem 0;
  z-index: 200;
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
  background-color: $color-white;
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
  background-color: $color-white;
}
.btn-greeting {
  background-image: url('../assets/icons/greeting.svg');
  background-color: $color-white;
}
.btn-preview {
  background-image: url('../assets/icons/preview.svg');
  opacity: 1;
}
.dashboard__settings {
  width: 8rem;
  box-shadow: $shadow;
  border-radius: $border-radius;
  background-color: $color-white;
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
  background-color: $color-gray;
}
.card__content {
  flex: 1;
  background-color: $color-white;
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
  align-items: center;
}
.profile__name {
  margin-right: 2rem;
  text-transform: uppercase;
  color: $color-white;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.2rem;
}
.profile__avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 2rem;
  cursor: pointer;
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
  background-color: lighten($color-gray, 10);
  padding: 2rem;
  z-index: 110;
}
.menu-item {
  display: block;
  text-transform: uppercase;
  font-weight: 400;
  color: $color-dark;
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
  background-color: $color-dark;
  opacity: 0.6;
}
.dashboard__modal {
  position: absolute;
  width: 60rem;
  height: 40rem;
  top: calc(50% - 20rem);
  left: calc(50% - 30rem);
  background-color: $color-white;
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
.profile-settings__input,
.profile-info__name {
  border: 0;
  outline: none;
  background-color: $color-white;
  color: $color-main;
  font-weight: 400;
}
.modal__profile-info {
  flex: 2;
  position: relative;
}
.profile-info__avatar {
  width: 15rem;
  height: 15rem;
  background-color: $color-gray;
  border-radius: 50%;
  margin-bottom: 2rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.profile-info__upload {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}
.profile-info__delete {
  color: #BB0000;
  cursor: pointer;
  font-size: 1.4rem;
  margin-top: 3rem;
}
.modal__profile-settings {
  flex: 3;
  align-items: stretch;
  border-left: 3px solid $color-gray;
}
.profile-settings__email,
.profile-settings__password {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-settings__email {
  margin-bottom: 2rem;
}
.profile-settings__title {
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 400;
  color: $color-darkgray;
}
.profile-settings__input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}
</style>
