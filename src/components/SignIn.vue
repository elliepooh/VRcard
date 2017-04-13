<template lang='pug'>
  .signin
    .logo.signin__logo
      a.logo__link
      h1.logo__title IMENGINE
    transition(name='form')
      .signin__form(v-show='form === "email"')
        h2.form__title What is your email?
        .form__input
          input.input-line(v-bind='inputAttributes' placeholder='im@engine.com'
          v-model='userEmail')
          span.input-required *
          a.input-action(@click='nextForm("password")')
        span.form-notification(v-if='notificationMessage') {{ notificationMessage }}
    transition(name='form')
      .signin__form(v-if='form === "password"')
        h2.form__title What is your password?
        .form__input
          input.input-line(v-bind='inputAttributes' placeholder='******'
          v-model='userPassword')
          span.input-required *
          a.input-action(@click='submit')
        span.form-notification(v-if='notificationMessage') {{ notificationMessage }}
    .signin__nav
      a.nav-point(@click='nextForm("email")'
      v-bind:class='{ "nav-point--active" : form == "email" }')
      a.nav-point(@click='nextForm("password")'
      v-bind:class='{ "nav-point--active" : form == "password" }')
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
    };
  },
  computed: {
    inputAttributes() {
      return {
        name: this.form,
        type: this.form,
      };
    },
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
      Firebase.dbUsersRef.child(this.convertEmail()).once('value').then((snapshot) => {
        if (snapshot.val()) {
          if (snapshot.val().signedUp) {
            this.signIn();
          } else {
            this.signUp();
          }
        } else {
          this.notificationMessage = 'Sorry, but there is no such email in our base';
        }
      });
    },
    convertEmail() {
      return this.userEmail.toLowerCase().replace(/@/g, '').replace(/\./g, '');
    },
    signUp() {
      Firebase.auth.createUserWithEmailAndPassword(
        this.userEmail, this.userPassword)
        .then(() => {
          Firebase.dbUsersRef.child(this.convertEmail()).set({
            signedUp: true,
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

<style lang='scss'>
.signin {
  height: calc(100% - 16rem);
  background-color: #6543DD;
  color: #fff;
  padding: 8rem;
  position: relative;
}
.logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
}
.logo__link {
  display: block;
  width: 7rem;
  height: 7rem;
  margin-right: 1rem;
  background: url('../assets/icons/logo.svg') no-repeat center / contain;
}
.logo__title {
  font-size: 3rem;
  font-weight: 500;
  letter-spacing: 0.4rem;
}
.signin__form {
  position: absolute;
  top: 40%;
  left: 8rem;
  width: 80%;
}
.form__title {
  margin-bottom: 5rem;
  font-size: 6rem;
  font-weight: 500;
  text-transform: uppercase;
}
.form__input {
  display: flex;
  position: relative;
}
.input-line {
  background-color: inherit;
  border: none;
  border-bottom: 3px solid #4E33AF;
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
  color: #4E33AF;
  font-size: 3.6rem;
}
.input-action {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: #fff url('../assets/icons/send.svg') no-repeat 60% center / 60%;
  cursor: pointer;
}
.form-notification {
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
.signin__nav {
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
  background-color: #fff;
  opacity: 0.7;
  cursor: pointer;
}
.nav-point--active {
  opacity: 1;
}
</style>
