<template lang='pug'>
  .signin
    .logo.signin__logo
      a.logo__link
      h1.logo__title IMENGINE
    .signin__form
      h2.form__title What is your {{ form }}?
      .form__input
        input.input-line(v-bind='inputAttributes')
        a.input-action(@click='submit')
    .signin__nav
      a.nav-point(@click='nextForm("email")'
      v-bind:class='{ "nav-point--active" : form == "email" }')
      a.nav-point(@click='nextForm("password")'
      v-bind:class='{ "nav-point--active" : form == "password" }')
</template>

<script>
export default {
  name: 'signIn',
  data() {
    return {
      form: 'email',
      userEmail: '',
      userPassword: '',
    };
  },
  computed: {
    inputAttributes() {
      return {
        name: this.form,
        type: this.form,
        placeholder: this.form === 'email' ? 'im@engine.com' : '******',
        'v-model': this.form,
      };
    },
  },
  methods: {
    nextForm(form) {
      this.form = form;
    },
    submit() {
      if (this.form === 'email') {
        this.nextForm('password');
      }
    },
  },
};
</script>

<style>
.signin {
  height: calc(100% - 16rem);
  background-color: #6543DD;
  color: #fff;
  padding: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
.logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.logo__link {
  display: block;
  width: 7rem;
  height: 7rem;
  margin-right: 1rem;
  background: url('../assets/img/logo.svg') no-repeat center / contain;
}
.logo__name {
  margin: 0;
  font-size: 3rem;
  font-weight: 500;
  letter-spacing: 0.4rem;
}
.signin__form {
  margin: auto 0;
}
.form__title {
  margin-bottom: 5rem;
  font-size: 6rem;
  font-weight: 500;
  text-transform: uppercase;
}
.form__input {
  display: flex;
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
}
.input-action {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: #fff url('../assets/img/send.svg') no-repeat 60% center / 60%;
  cursor: pointer;
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
