<template lang='pug'>
  .main
    router-view
</template>

<script>
import router from '@/router';
import Firebase from '@/appconfig/firebase';

export default {
  name: 'app',
  data() {
    return {
      user: null,
    };
  },
  created() {
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        router.push({
          path: 'dashboard',
          params: {
            user: this.user,
          },
        });
      } else {
        router.push('signin');
      }
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&subset=cyrillic');

* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 62.5%;
}
body {
  width: 100vw;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
  overflow: hidden;
}
::-webkit-input-placeholder {
  color: #4E33AF;
}
::-moz-placeholder {
  color: #4E33AF;
}
:-ms-input-placeholder {
  color: #4E33AF;
}
:-moz-placeholder {
  color: #4E33AF;
}
.main {
  width: 100%;
  height: 100%;
}
</style>
