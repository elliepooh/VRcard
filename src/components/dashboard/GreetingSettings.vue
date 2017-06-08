<template lang='pug'>
  .settings

    transition(name='vertical-toggle')
      .notification(v-if='message' @click='message = ""') {{ message }}

    .settings-windows
      .settings-multiple
        .settings-window.card-destination
          .settings-item
            .item-name From
            input.item-input(
              name='from'
              type='text'
              v-model='info.from')
          .settings-item
            .item-name To
            input.item-input(
              name='to'
              type='text'
              v-model='info.to')
        .settings-window.card-name
          .settings-item
            .item-name(v-bind:class='{ "item-warn": warn.includes("cardname") }')
              | Card name
            input.item-input.input-required(
              placeholder='Enter card name'
              name='cardname'
              type='text'
              v-model='info.cardname'
              required
              v-bind:disabled='cardname')
            span.item-required *
            .item-tooltip(
              v-bind:class='{ "item-warn": warn.includes("tooltip") }') {{ tooltipText }}

      .settings-window.card-text
        .settings-item
          .item-name Text
          textarea.item-description(
            placeholder='Enter congratulation text'
            name='text'
            rows='20'
            cols='24'
            v-model='info.text')

      .settings-window.card-background
        .settings-item
          .item-name Choose your card
          .item-background(
            v-for='preview in previews'
            v-show='preview.name === info.image'
            v-bind:style='{ backgroundImage: `url(${preview.url})` }')
          .item-line.item-nav
            a.nav-point(
              v-for='preview in previews'
              @click='changePreview(preview)'
              v-bind:class='{ "point-active": preview.name === info.image }')

    .btn(@click='accept') Accept
</template>

<script>
import Firebase from '@/appconfig/firebase';
import router from '@/router';

export default {
  name: 'greetingSettings',
  props: [
    'userRef',
    'cardsRef',
    'limit',
    'cardname',
  ],
  data() {
    return {
      info: {
        cardname: '',
        from: '',
        to: '',
        text: '',
        image: '',
        imageURL: '',
      },

      previewsNames: [
        'chameleon.png',
        'saturn.png',
        'sheep.png',
        'watermelon.png',
        'fireflies.png',
      ],
      previews: [],

      warn: [],
      tooltipText: '',
      message: '',
    };
  },
  created() {
    if (!this.cardsRef) {
      router.push('/dashboard');
    }
    if (this.cardname) {
      this.getCardData();
      this.tooltipText = 'Cardname can not be changed';
    } else {
      this.tooltipText = 'Card name should contain only numbers, letters or _ . - characters.';
    }
    this.getPreviews();
  },
  methods: {
    getCardData() {
      this.cardsRef.child(this.cardname).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          Object.keys(this.info).forEach((key) => {
            const dbKey = snapshot.child(key).val();
            if (dbKey) {
              this.$set(this.info, key, dbKey);
            }
          });
        }
      });
    },
    getPreviews() {
      this.previewsNames.forEach((name) => {
        Firebase.previewsRef.child('greeting').child(name).getDownloadURL().then((url) => {
          this.previews.push({ name, url });
          this.info.image = this.info.image || name;
        });
      });
    },
    accept() {
      if (this.cardname) {
        this.updateInfo();
      } else {
        this.addCard();
      }
    },
    addCard() {
      this.checkData();
      if (!this.warn.length) {
        this.userRef.child('cardLimit').set(this.limit - 1);
        Object.keys(this.info).forEach((key) => {
          const value = this.info[key];
          if (value) {
            this.cardsRef.child(this.info.cardname).child(key).set(value);
          }
        });
        this.cardsRef.child(this.info.cardname).child('type').set('greeting');
        this.message = 'Card added!';
      }
    },
    updateInfo() {
      this.checkData();
      if (!this.warn.length) {
        Object.keys(this.info).forEach((key) => {
          const value = this.info[key];
          if (value) {
            this.cardsRef.child(this.info.cardname).child(key).set(value);
          }
        });
        this.message = 'Card updated!';
      }
    },
    checkData() {
      this.warn = [];
      if (!(/^[0-9a-zA-Z_.-]+$/.test(this.info.cardname))) this.warn.push('tooltip');
      if (!this.info.cardname) this.warn.push('cardname');
    },
    changePreview(preview) {
      this.info.image = preview.name;
      this.info.imageURL = preview.url;
    },
  },
  watch: {
    message() {
      if (this.message) {
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~settings';

.settings-multiple,
.card-text {
  margin-right: 4rem;
  flex: 1;
}
.card-name {
  padding-bottom: 10rem;
}
.item-tooltip {
  bottom: -8rem;
}
.card-background {
  flex: 3;
}

</style>
