<template lang='pug'>
  .main
    card-nav
    router-view
</template>

<script>
import CardNav from './components/CardNav';

export default {
  name: 'app',
  components: {
    CardNav,
  },
};
</script>

<style>
* {
  margin: 0;
  overflow: hidden;
}
body {
  width: 100vw;
  height: 100vh;
}
.main {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
