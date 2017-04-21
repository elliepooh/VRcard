<template lang='pug'>
  .dashboard
    header.header
      .logo
        a.logo-img
        h1.logo-title IMENGINE
      .header-profile
        .profile-name {{ username }}
        .profile-avatar(:style='{ backgroundImage: `url(${userPhotoURL})` }'
        @click='showProfileModal = true')
        .profile-more
          .profile-menu
            a.menu-item(@click='showProfileModal = true') Settings
            a.menu-item(@click='logOut') Log out

      transition(name='vertical-toggle')
        .notification(v-if='message' @click='message = ""') {{ message }}

    .content
      .actions(v-if='!$route.path.includes("settings")')
        .actions-add
          a.dashboard-btn.btn-add(@click='addCard'
        v-bind:class='{ "btn-add-active": chooseCard }')
        transition-group(name='vertical-toggle' tag='div')
          a.dashboard-btn.btn-business(v-if='chooseCard'
          @click='showBusinessSettings' key='business')
          a.dashboard-btn.btn-greeting(v-if='chooseCard'
          @click='showGreetingSettings' key='greeting')
        a.dashboard-btn.btn-preview(href='preview-business' target='_blank')

      router-view

      nav.settings
        router-link.dashboard-btn.btn-home(to='/'
        v-bind:class='{ "btn-active": $route.path === "/dashboard" }')
        router-link.dashboard-btn.btn-settings(to='business-settings'
        v-bind:class='{ "btn-active": $route.path.includes("settings") }')
        transition(name='vertical-toggle')
          a.dashboard-btn.btn-brush(v-if='$route.path.includes("business-settings")')

    .overlay(v-if='showProfileModal' @click='showProfileModal = false')
    .modal(v-if='showProfileModal')
      .modal-info
        .info-avatar(:style='{ backgroundImage: `url(${userPhotoURL})` }')
        input.info-upload(name='photo' id='photo' type='file'
        @change='uploadPhoto')
        label.btn(for='photo') Upload photo
        a.info-delete Delete account?
      .modal-settings
        .settings-email
          .settings-title Change your email
          input.settings-input(placeholder='Old email'
          name='email' type='email' v-model='oldEmail')
          input.settings-input(placeholder='New email'
          name='email' type='email' v-model='newEmail')
          a.btn(@click='updateEmail') Accept
        .settings-password
          .settings-title Change your password
          input.settings-input(placeholder='Old password'
          name='password' type='password' v-model='oldPassword')
          input.settings-input(placeholder='New password'
          name='password' type='password' v-model='newPassword')
          a.btn Accept

    nav.pagination
      //- a.point(v-for='card in numOfCards')
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
      message: '',
      chooseCard: false,
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
        this.oldEmail = this.user.email;

        this.checkUserData();
      }
    });
  },
  methods: {
    addCard() {
      if (this.limit > 0) {
        this.chooseCard = !this.chooseCard;
      }
      this.showCardLimit();
    },
    showCardLimit() {
      this.message = `You have ${this.limit} cards limit`;
    },
    showBusinessSettings() {
      if (this.limit > 0) {
        router.push({
          name: 'business-settings',
          params: {
            userRef: this.userRef,
            username: this.username,
            limit: this.limit,
          },
        });
      } else {
        this.showCardLimit();
      }
    },
    showGreetingSettings() {
    },
    checkUserData() {
      this.userRef.once('value').then((snapshot) => {
        this.limit = snapshot.val().cardLimit;
        if (snapshot.val().cards) {
          router.push({
            path: 'dashboard/gallery',
            params: {
              numOfCards: snapshot.val().cards.length,
            },
          });
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
    updateEmail() {
      this.user.updateEmail(this.newEmail);
    },
    logOut() {
      Firebase.auth.signOut();
      router.push('/');
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
@import '~style';

.dashboard {
  height: 100%;
  width: 100%;
  background-color: $color-gray;
}
.header {
  background-color: $color-main;
  height: 10rem;
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
.vertical-toggle-enter-active,
.vertical-toggle-leave-active, {
  transition: all .4s ease-in;
}
.vertical-toggle-enter,
.vertical-toggle-leave-to {
  transform: translateY(-8rem);
  opacity: 0;
}
.content {
  height: calc(100% - 10rem);
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
  margin-right: 6rem;
}
.actions-add,
.btn-preview {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
  border-radius: $border-radius;
  background-color: $color-white;
  z-index: 10;
  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.5);
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
.settings {
  width: 8rem;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
  border-radius: $border-radius;
  background-color: $color-white;
  margin-left: 6rem;
  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.5);
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
.modal-info,
.modal-settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
}
.modal-info {
  flex: 2;
  position: relative;
}
.info-avatar {
  width: 15rem;
  height: 15rem;
  background-color: $color-gray;
  border-radius: 50%;
  margin-bottom: 2rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.info-upload {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}
.info-delete {
  color: #BB0000;
  cursor: pointer;
  font-size: 1.4rem;
  margin-top: 3rem;
}
.modal-settings {
  flex: 3;
  align-items: stretch;
  border-left: 3px solid $color-darkgray;
}
.settings-input {
  background-color: $color-white;
  color: $color-main;
  font-weight: 400;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}
.settings-email,
.settings-password {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.settings-email {
  margin-bottom: 2rem;
}
.settings-title {
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 400;
  color: darken($color-darkgray, 20);
}
</style>
