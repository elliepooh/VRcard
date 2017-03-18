<template>
  <div class='main'>
    <router-view name='bground'></router-view>
    <router-view name='card'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
  background-color: #c6e2ff;
}
</style>
