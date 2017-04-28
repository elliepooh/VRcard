<template lang='pug'>
  .settings

    transition(name='vertical-toggle')
      .notification(v-if='message' @click='message = ""') {{ message }}

    .settings-windows
      .settings-window
        .settings-item
          .item-name(v-bind:class='{ "item-warn": warn.includes("firstName") }') First name
          input.item-input.input-required(placeholder='Enter your first name'
          name='firsName' type='text' v-model='info.firstName' required)
          span.item-required *
        .settings-item
          .item-name(v-bind:class='{ "item-warn": warn.includes("lastName") }') Last name
          input.item-input.input-required(placeholder='Enter your last name'
          name='lastName' type='text' v-model='info.lastName' required)
          span.item-required *
        .settings-item
          .item-name Email
          input.item-input(placeholder='Enter your email' name='email'
          type='email' v-model='info.email')
        .settings-item
          .item-name Phone number
          input.item-input(placeholder='Enter your phone number' name='phone'
          type='tel' v-model='info.phone')

      .settings-multiple
        .settings-window.card-name
          .settings-item
            .item-name(v-bind:class='{ "item-warn": warn.includes("cardname") }') Card name
            input.item-input.input-required(placeholder='Enter card name'
            name='cardname' type='text' v-model='info.cardname' required
            v-bind:disabled='cardname')
            span.item-required *
            .item-tooltip(v-bind:class='{ "item-warn": warn.includes("tooltip") }') {{ tooltipText }}
        .settings-window.card-description
          .settings-item
            .item-name Description
            textarea.item-description(placeholder='Tell something about you'
            name='description' rows='7' cols='38' v-model='info.description')

      .settings-window
        .settings-item
          .item-name Facebook
          input.item-input(placeholder='Enter link' name='facebook'
          type='text' v-model='info.facebook')
        .settings-item
          .item-name Twitter
          input.item-input(placeholder='Enter link' name='twitter'
          type='text' v-model='info.twitter')
        .settings-item
          .item-name VK
          input.item-input(placeholder='Enter link' name='vkontakte'
          type='text' v-model='info.vkontakte')
        .settings-item
          .item-name Instagram
          input.item-input(placeholder='Enter link' name='insagram'
          type='text' v-model='info.instagram')

    .btn(@click='accept') Accept
</template>

<script>
import router from '@/router';

export default {
  name: 'businessSettings',
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
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: '',
        facebook: '',
        twitter: '',
        vkontakte: '',
        instagram: '',
      },

      warn: [],
      tooltipText: '',
      message: '',
    };
  },
  created() {
    if (!this.cardsRef) {
      router.push('/');
    } else {
      this.getCardData();
      this.tooltipText = this.cardname ?
        'Cardname can not be changed' :
        'Card name should contain only numbers, letters or _ . - characters.';
    }
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
        this.cardsRef.child(this.info.cardname).child('type').set('business');
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
      if (!this.info.firstName) this.warn.push('firstName');
      if (!this.info.lastName) this.warn.push('lastName');
      if (!this.info.cardname) this.warn.push('cardname');
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

.item-required {
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  color: $color-main;
  font-size: 3rem;
}
.item-tooltip {
  position: absolute;
  bottom: -4rem;
  font-style: italic;
  left: 0;
  color: $color-darkgray;
  font-size: 1.4rem;
}
.input-required {
  border-color: $color-main;
}
.item-warn {
  color: #E74949;
}
.item-warn ~ .input-required {
  border-color: #E74949;
}
.item-warn ~ .item-required {
  color: #E74949;
}
.card-name {
  flex: 1;
  padding-top: 3rem;
  margin-bottom: 3rem;
}
.card-description {
  flex: 3;
  padding-top: 3rem;
  padding-bottom: 0;
}
.item-description {
  border: 1px solid $color-darkgray;
  outline: none;
  resize: none;
  padding: 1rem;
}
</style>
