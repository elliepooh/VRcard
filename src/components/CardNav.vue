<template lang='pug'>
  .nav
    router-link.nav-link(to='/cactus') Cactus
    router-link.nav-link(to='/land') Land
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
  color: #fff;
  margin-right: 1rem;
}
</style>
