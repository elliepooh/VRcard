<template lang='pug'>
  .card
    chameleon
</template>

<script>
import Chameleon from './cards/Chameleon';

export default {
  name: 'card',
  components: {
    Chameleon,
  },
  data() {
    return {
      three: null,
    };
  },
  methods: {
  },
};
</script>

<style>
.card {
  width: 100%;
  height: 100%;
}
</style>
