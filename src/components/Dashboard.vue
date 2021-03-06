<template lang='pug'>
  .dashboard
    header.header
      .logo
        a.logo-img
        h1.logo-title IMENGINE
      .header-profile
        .profile-name {{ username }}
        .profile-avatar(
          :style='{ backgroundImage: `url(${userPhotoURL})` }'
          @click='showModal = true')
        .profile-more
          .profile-menu
            a.menu-item(@click='showModal = true') Settings
            a.menu-item(@click='logOut') Log out

      transition(name='vertical-toggle')
        .notification(v-if='message' @click='message = ""') {{ message }}

    .content
      .actions(v-if='$route.name === "dashboard"')
        .actions-add
          a.dashboard-btn.btn-add(
            @click='chooseCard'
            v-bind:class='{ "btn-add-active": showCardTypes }')
        transition-group(name='vertical-toggle' tag='div')
          a.dashboard-btn.btn-business(
            v-if='showCardTypes'
            @click='addCard("business")'
            key='business')
          a.dashboard-btn.btn-greeting(
            v-if='showCardTypes'
            @click='addCard("greeting")'
            key='greeting')
        a.dashboard-btn.btn-preview(href='/' target='_blank')

      .gallery(v-if='$route.name === "dashboard"')
        .card(v-if='cards.length')
          .card-img(:style='{ backgroundImage: `url(${cardData.imageURL})` }')
          .card-content
            h3.card-title {{ cardTitle }}
            span.card-subtitle {{ cardSubtitle }}
            p.card-description {{ cardData.description }} {{ cardData.text }}
          a.btn.btn-view

      router-view(:key='$route.path')

      nav.settings-board
        router-link.dashboard-btn.btn-home(
          to='/dashboard'
          v-bind:class='{ "btn-active": $route.path === "/dashboard" }')
        a.dashboard-btn.btn-settings(
          @click='showSettings'
          v-bind:class='{ "btn-active": $route.path.includes("settings") }')
        transition(name='vertical-toggle')
          a.dashboard-btn.btn-brush(
            v-if='$route.path.includes("business")'
            v-bind:class='{ "btn-active": $route.path.includes("assets") }'
            @click='showBusinessAssets')

      nav.pagination(v-if='cards.length > 1 && $route.name === "dashboard"')
        a.point(
          v-for='(card, index) in cards'
          @click='cardIndex = index'
          v-bind:class='{ "point-active": index === cardIndex }')

      .overlay(v-if='showModal' @click='showModal = false')
      .modal(v-if='showModal')
        .modal-assets
          .assets-avatar(:style='{ backgroundImage: `url(${userPhotoURL})` }')
          input.assets-upload(
            name='photo'
            id='photo'
            type='file'
            @change='uploadPhoto')
          label.btn(for='photo') Upload photo
        .modal-info
          .info-email
            .info-title Change your email
            input.info-input(
              placeholder='Old email'
              name='email'
              type='email'
              v-model='oldEmail')
            input.info-input(
              placeholder='New email'
              name='email'
              type='email'
              v-model='newEmail')
            a.btn(@click='updateEmail') Accept
          .info-password
            .info-title Change your password
            input.info-input(
              placeholder='Old password'
              name='password'
              type='password'
              v-model='oldPassword')
            input.info-input(
              placeholder='New password'
              name='password'
              type='password'
              v-model='newPassword')
            a.btn Accept
</template>

<script>
/* eslint-disable no-param-reassign */
import Firebase from '@/appconfig/firebase';
import router from '@/router';

export default {
  name: 'dashboard',
  data() {
    return {
      user: null,
      userRef: null,
      cardsRef: null,
      username: '',
      userPhotoURL: '',
      limit: 0,

      message: '',

      showCardTypes: false,
      showModal: false,

      cards: [],
      cardIndex: 0,

      oldEmail: '',
      newEmail: '',
      oldPassword: '',
      newPassword: '',
    };
  },
  created() {
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.username = this.user.displayName;

        this.userRef = Firebase.dbUsersRef.child(this.user.uid);
        this.cardsRef = Firebase.dbCardsRef.child(this.username);

        this.userPhotoURL = this.user.photoURL;
        this.oldEmail = this.user.email;

        this.getUserData();
        this.getCardsData();
      }
    });
  },
  methods: {
    getUserData() {
      this.userRef.once('value').then((snapshot) => {
        this.limit = snapshot.val().cardLimit;
      });
    },
    getCardsData() {
      this.cards = [];

      const businessCardDataKeys = [
        'cardname',
        'firstName',
        'lastName',
        'email',
        'description',
        'imageURL',
        'type',
      ];

      const greetingCardDataKeys = [
        'cardname',
        'from',
        'to',
        'text',
        'imageURL',
        'type',
      ];

      this.cardsRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((card) => {
            const data = {};
            const cardDataKeys = card.val().type === 'business' ?
              businessCardDataKeys : greetingCardDataKeys;
            cardDataKeys.forEach((key) => {
              const dbKey = card.child(key).val();
              if (dbKey) {
                if ((key === 'description' || key === 'text') && dbKey.length > 400) {
                  data[key] = `${dbKey.slice(0, dbKey.slice(0, 400).lastIndexOf(' '))}...`;
                } else {
                  data[key] = dbKey;
                }
              }
            });
            data.cardname = card.key;
            this.cards.push(data);
          });
        }
      });
    },
    chooseCard() {
      if (this.limit > 0) {
        this.showCardTypes = !this.showCardTypes;
      }
      this.showCardLimit();
    },
    showCardLimit() {
      this.message = `You have ${this.limit} cards limit`;
    },
    addCard(type) {
      const routeName = type === 'business' ? 'business-settings' : 'greeting-settings';
      if (this.limit > 0) {
        router.push({
          name: routeName,
          params: {
            userRef: this.userRef,
            cardsRef: this.cardsRef,
            limit: this.limit,
          },
        });
      } else {
        this.showCardLimit();
      }
    },
    showSettings() {
      const routerName = this.cardData.type === 'business' ?
        'business-settings' : 'greeting-settings';
      router.push({
        name: routerName,
        params: {
          cardsRef: this.cardsRef,
          cardname: this.cardData.cardname,
        },
      });
    },
    showBusinessAssets() {
      router.push({
        name: 'business-assets',
        params: {
          cardsRef: this.cardsRef,
          cardname: this.cardData.cardname,
          uid: this.user.uid,
        },
      });
    },
    uploadPhoto(event) {
      const file = event.target.files[0];
      if (file.size / 1024 < 2048) {
        const storageFileRef = Firebase.profilePhotosRef.child(this.user.uid);
        const task = storageFileRef.put(file);
        task.on('state_changed', () => {
          storageFileRef.getDownloadURL().then((url) => {
            this.userPhotoURL = url;
            this.user.updateProfile({
              photoURL: url,
            });
          });
        });
      } else {
        this.message = 'Your image is too big. Maximal file size is 2MB.';
      }
    },
    updateEmail() {
      this.user.updateEmail(this.newEmail);
    },
    logOut() {
      Firebase.auth.signOut();
      router.push('/');
    },
  },
  computed: {
    cardData() {
      return this.cards[this.cardIndex];
    },
    cardTitle() {
      return this.cardData.type === 'business' ?
        `${this.cardData.firstName} ${this.cardData.lastName}` : `To: ${this.cardData.to}`;
    },
    cardSubtitle() {
      return this.cardData.type === 'business' ?
        this.cardData.email : `From: ${this.cardData.from}`;
    },
  },
  watch: {
    message() {
      if (this.message) {
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~global';

.dashboard {
  height: 100%;
  width: 100%;
  background-color: $color-gray;
}
.header {
  background-color: $color-main;
  height: 12rem;
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 200;
}
.header-profile {
  display: flex;
  align-items: center;
}
.profile-name {
  margin-right: 2rem;
  text-transform: uppercase;
  color: $color-white;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.2rem;
}
.profile-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 2rem;
  cursor: pointer;
}
.profile-more {
  width: 2rem;
  height: 5rem;
  background: url('../assets/icons/more.svg') center / cover no-repeat;
  position: relative;
  cursor: pointer;
  &:hover .profile-menu {
    display: block;
  }
}
.profile-menu {
  display: none;
  position: absolute;
  top: 5rem;
  right: 0;
  background-color: $color-white;
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
.notification {
  position: absolute;
  height: 4rem;
  line-height: 4rem;
  width: 30rem;
  top: calc(50% - 2rem);
  left: calc(50% - 15rem);
  text-align: center;
  vertical-align: middle;
  color: $color-white;
  font-weight: 400;
}
.content {
  height: calc(100% - 12rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6rem;
}
.actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40rem;
  width: 8rem;
  margin-right: 5rem;
}
.actions-add,
.btn-preview {
  box-shadow: $shadow;
  border-radius: $border-radius;
  background-color: $color-white;
  z-index: 10;
  &:hover {
    box-shadow: $shadow-hover;
  }
}
.btn-add {
  background-image: url('../assets/icons/plus.svg');
  background-size: 70%;
  transition: .3s ease-in;
}
.btn-add-active {
  transform: rotate(45deg);
}
.btn-business {
  background-image: url('../assets/icons/business.svg');
  background-color: $color-white;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}
.btn-greeting {
  background-image: url('../assets/icons/greeting.svg');
  background-color: $color-white;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}
.btn-preview {
  background-image: url('../assets/icons/preview.svg');
  opacity: 1;
}
.settings-board {
  width: 8rem;
  box-shadow: $shadow;
  border-radius: $border-radius;
  background-color: $color-white;
  margin-left: 5rem;
  &:hover {
    box-shadow: $shadow-hover;
  }
}
.btn-home {
  background-image: url('../assets/icons/home.svg');
}
.btn-settings {
  background-image: url('../assets/icons/settings.svg');
}
.btn-brush {
  background-image: url('../assets/icons/brush.svg');
}
.dashboard-btn {
  display: block;
  cursor: pointer;
  height: 8rem;
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
}
.btn-active {
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
.gallery {
  flex: 1;
  height: 40rem;
  position: relative;
}
.card {
  width: 100%;
  height: 100%;
  box-shadow: $shadow;
  border-radius: $border-radius;
  display: flex;
  position: relative;
}
.card-img {
  flex: 2;
  background-color: $color-gray;
  background-size: cover;
  background-position: center;
}
.card-content {
  flex: 1;
  background-color: $color-white;
  padding: 3rem;
  display: flex;
  flex-direction: column;
}
.card-title {
  font-size: 2.6rem;
  color: $color-dark;
  margin-bottom: 1rem;
}
.card-subtitle {
  color: $color-dark;
  font-size: 1.8rem;
  margin-bottom: 3rem;
}
.card-description {
  overflow: hidden;
  font-size: 1.8rem;
  color: darken($color-darkgray, 20);
}
.btn-view {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  width: 6rem;
  height: 6rem;
  background-image: url('../assets/icons/eye.svg');
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
}
.pagination {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 7rem;
  left: 0;
}
.point {
  width: 3rem;
  height: 3rem;
  background-color: $color-darkgray;
  border-radius: 50%;
  cursor: pointer;
  &:not(:last-of-type) {
    margin-right: 2rem;
  }
}
.point-active {
  background-color: $color-main;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: $color-dark;
  opacity: 0.6;
}
.modal {
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
.modal-assets,
.modal-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
}
.assets-profile {
  flex: 2;
  position: relative;
}
.assets-avatar {
  width: 15rem;
  height: 15rem;
  background-color: $color-gray;
  border-radius: 50%;
  margin-bottom: 2rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.assets-upload {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}
.modal-info {
  flex: 3;
  align-items: stretch;
  border-left: 3px solid $color-darkgray;
}
.info-input {
  background-color: $color-white;
  color: $color-main;
  font-weight: 400;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}
.info-email,
.info-password {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-email {
  margin-bottom: 2rem;
}
.info-title {
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 400;
  color: darken($color-darkgray, 20);
}
</style>
