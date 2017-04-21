<template lang='pug'>
  .signin
    .logo
      a.logo-img
      h1.logo-title IMENGINE
    transition(name='form')
      .form(v-show='form === "email"')
        h2.form-title Enter your email
        .form-input
          input.input-line(v-bind='inputAttributes' placeholder='anderson@matrix.net'
          v-model='userEmail')
          span.input-required *
          a.input-action(@click='nextForm("password")')
        span.notification(v-if='notificationMessage') {{ notificationMessage }}

    transition(name='form')
      .form(v-if='form === "password"')
        h2.form-title Enter your password
        .form-input
          input.input-line(v-bind='inputAttributes' placeholder='******'
          v-model='userPassword')
          span.input-required *
          a.input-action(@click='submit')
        span.notification(v-if='notificationMessage') {{ notificationMessage }}

    transition(name='form')
      .signin-form(v-if='form === "username"')
        h2.form-title Enter your username
        .form-input
          input.input-line(v-bind='inputAttributes' placeholder='neo'
          v-model='username')
          span.input-required *
          a.input-action(@click='checkUsername')
        span.notification(v-if='notificationMessage') {{ notificationMessage }}

    .nav
      a.nav-point(@click='nextForm("email")'
      v-bind:class='{ "point-active" : form == "email" }')
      a.nav-point(@click='nextForm("password")'
      v-bind:class='{ "point-active" : form == "password" }')
</template>

<script>
import router from '@/router';
import Firebase from '@/appconfig/firebase';

export default {
  name: 'signIn',
  data() {
    return {
      form: 'email',
      notificationMessage: null,
      userEmail: '',
      userPassword: '',
      username: '',
    };
  },
  computed: {
    inputAttributes() {
      return {
        name: this.form,
        type: this.form,
        cardLimit: 0,
      };
    },
  },
  mounted() {
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('dashboard');
      }
    });
  },
  methods: {
    nextForm(form) {
      this.checkEmptyForm();
      if (!this.notificationMessage) {
        this.form = form;
      }
    },
    checkEmptyForm() {
      if ((this.form === 'email' && this.userEmail.length === 0)
      || (this.form === 'password' && this.userPassword.length === 0)) {
        this.notificationMessage = 'Please fill the field before continuing';
      } else {
        this.notificationMessage = null;
      }
    },
    submit() {
      Firebase.dbEmailsRef.child(this.convertEmail()).once('value').then((snapshot) => {
        if (snapshot.val()) {
          if (snapshot.val().signedUp) {
            this.signIn();
          } else {
            this.cardLimit = snapshot.val().cardLimit;
            this.nextForm('username');
          }
        } else {
          this.notificationMessage = 'Sorry, but there is no such email in our base';
        }
      });
    },
    convertEmail() {
      return this.userEmail.toLowerCase().replace(/@/g, '').replace(/\./g, '');
    },
    checkUsername() {
      if (/^[0-9a-zA-Z_.-]+$/.test(this.username)) {
        this.signUp();
      } else {
        this.notificationMessage = 'Username should contain only numbers, letters or _ . - characters.';
      }
    },
    signUp() {
      Firebase.auth.createUserWithEmailAndPassword(
        this.userEmail, this.userPassword)
        .then((user) => {
          Firebase.dbEmailsRef.child(this.convertEmail()).set({
            signedUp: true,
          });
          Firebase.dbUsersRef.child(user.uid).set({
            email: this.userEmail,
            username: this.username,
            cardLimit: this.cardLimit,
          });
          user.updateProfile({
            displayName: this.username,
          });
          this.signIn();
        }).catch((error) => {
          switch (error.code) {
            case 'auth/weak-password':
              this.notificationMessage = 'The password should be at least six symbols.';
              break;
            case 'auth/invalid-email':
              this.notificationMessage = 'The email address is not valid.';
              break;
            default:
              this.notificationMessage = error.code;
          }
        },
      );
    },
    signIn() {
      Firebase.auth.signInWithEmailAndPassword(
        this.userEmail, this.userPassword)
        .then(() => router.push('dashboard'))
        .catch((error) => {
          switch (error.code) {
            case 'auth/wrong-password':
              this.notificationMessage = 'The password is invalid for the given email';
              break;
            case 'auth/invalid-email':
              this.notificationMessage = 'The email address is not valid.';
              break;
            default:
              this.notificationMessage = error.code;
          }
        },
      );
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~style';

::-webkit-input-placeholder {
  color: darken($color-main, 10);
}
::-moz-placeholder {
  color: darken($color-main, 10);
}
:-ms-input-placeholder {
  color: darken($color-main, 10);
}
:-moz-placeholder {
  color: darken($color-main, 10);
}
.signin {
  height: calc(100% - 16rem);
  background-color: $color-main;
  color: #fff;
  padding: 8rem;
  position: relative;
}
.form {
  position: absolute;
  top: 40%;
  left: 8rem;
  width: 80%;
}
.form-title {
  margin-bottom: 5rem;
  font-size: 6rem;
  font-weight: 500;
  text-transform: uppercase;
}
.form-input {
  display: flex;
  position: relative;
}
.input-line {
  background-color: inherit;
  border: none;
  border-bottom: 3px solid $color-main;
  outline: none;
  font-size: 3.6rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  margin-right: 3rem;
  color: #fff;
  width: 40%;
}
.input-required {
  position: absolute;
  display: block;
  top: 0;
  left: calc(40% - 1rem);
  color: $color-main;
  font-size: 3.6rem;
}
.input-action {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: $color-white url('../assets/icons/send.svg') no-repeat 60% center / 60%;
  cursor: pointer;
}
.notification {
  position: absolute;
  bottom: -4rem;
  left: 0;
  font-size: 2rem;
  color: #FF8F6D;
}
.form-enter-active,
.form-leave-active {
  transition: all .5s ease-in-out;
}
.form-enter {
  transform: translateY(-60vh);
}
.form-leave-to {
  transform: translateY(60vh);
}
.nav {
  position: absolute;
  top: 50%;
  right: 8rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.nav-point {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: $color-white;
  opacity: 0.7;
  cursor: pointer;
}
.point-active {
  opacity: 1;
}
</style>
