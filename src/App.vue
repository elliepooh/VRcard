<template>
  <div class='main'>
    <router-view name='cubic'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
}
.main {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  overflow: hidden;
}
</style>
