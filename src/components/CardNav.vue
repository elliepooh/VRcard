<template lang='pug'>
  .nav
    router-link.nav-link(to='/cactus') Cactus
    router-link.nav-link(to='/businessCard') Business Card
    router-link.nav-link(to='/card') Card
</template>

<script>
export default {
  name: 'cardNav',
};
</script>

<style>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.nav-link {
  text-decoration: none;
  margin-right: 1rem;
  cursor: pointer;
}
</style>
