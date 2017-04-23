<template lang='pug'>
  .business-settings
    .settings-windows
      .settings-window
        .settings-item
          .item-name(v-bind:class='{ "item-warn": warn.includes("firstName") }') First name
          input.item-input.input-required(placeholder='Enter your first name'
          name='firsName' type='text' v-model='firstName' required)
          span.item-required *
        .settings-item
          .item-name(v-bind:class='{ "item-warn": warn.includes("lastName") }') Last name
          input.item-input.input-required(placeholder='Enter your last name'
          name='lastName' type='text' v-model='lastName' required)
          span.item-required *
        .settings-item
          .item-name Email
          input.item-input(placeholder='Enter your email' name='email'
          type='email' v-model='email')
        .settings-item
          .item-name Phone number
          input.item-input(placeholder='Enter your phone number' name='phone'
          type='tel' v-model='phone')

      .settings-center
        .settings-window.card-name
          .settings-item
            .item-name(v-bind:class='{ "item-warn": warn.includes("cardname") }') Card name
            input.item-input.input-required(placeholder='Enter card name'
            name='cardname' type='text' v-model='cardname' required)
            span.item-required *
            .item-tooltip(v-bind:class='{ "item-warn": warn.includes("tooltip") }')
              | Card name should contain only numbers, letters or _ . - characters.
        .settings-window.card-description
          .settings-item
            .item-name Description
            textarea.item-description(placeholder='Tell something about you'
            name='description' rows='7' cols='38' v-model='description')

      .settings-window
        .settings-item
          .item-name Facebook
          input.item-input(placeholder='Enter link' name='facebook'
          type='text' v-model='facebook')
        .settings-item
          .item-name Twitter
          input.item-input(placeholder='Enter link' name='twitter'
          type='text' v-model='twitter')
        .settings-item
          .item-name VK
          input.item-input(placeholder='Enter link' name='vkontakte'
          type='text' v-model='vkontakte')
        .settings-item
          .item-name Instagram
          input.item-input(placeholder='Enter link' name='insagram'
          type='text' v-model='instagram')

    .btn(@click='addCard') Accept
</template>

<script>
import Firebase from '@/appconfig/firebase';
import router from '@/router';

export default {
  name: 'businessSettings',
  props: ['userRef', 'username', 'limit'],
  data() {
    return {
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

      cardDataKeys: [
        'firstName',
        'lastName',
        'email',
        'phone',
        'description',
        'facebook',
        'twitter',
        'vkontakte',
        'instagram',
      ],
      warn: [],
    };
  },
  created() {
    if (!this.username) {
      router.push('/');
    } else {
      this.getCardData();
    }
  },
  methods: {
    getCardData() {
      Firebase.dbCardsRef.child(this.username).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          this.cardDataKeys.forEach((key) => {
            const dbKey = snapshot.child(key).val();
            if (dbKey) {
              this.$data[key] = dbKey;
            }
          });
        }
      });
    },
    addCard() {
      this.checkData();
      if (!this.warn.length) {
        this.userRef.child('cardLimit').set(this.limit - 1);
        this.cardDataKeys.forEach((key) => {
          const value = this.$data[key];
          if (value) {
            Firebase.dbCardsRef.child(this.username).child(this.cardname).child(key).set(value);
          }
        });
        Firebase.dbCardsRef.child(this.username).child(this.cardname).child('type').set('business');
        router.push('/');
      }
    },
    checkData() {
      this.warn = [];
      if (!(/^[0-9a-zA-Z_.-]+$/.test(this.cardname))) this.warn.push('tooltip');
      if (!this.firstName) this.warn.push('firstName');
      if (!this.lastName) this.warn.push('lastName');
      if (!this.cardname) this.warn.push('cardname');
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~style';

.business-settings {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 3rem;
  position: relative;
  align-items: center;
}
.settings-windows {
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 3rem;
}
.settings-window {
  flex-basis: 20%;
  background-color: $color-white;
  box-shadow: $shadow;
  border-radius: $border-radius;
  padding: 6rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.settings-center {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.settings-item {
  position: relative;
  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
}
.item-name {
  color: darken($color-darkgray, 20);
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 400;
}
.item-input {
  width: 100%;
  color: $color-main;
  border-bottom: 2px solid $color-darkgray;
  background-color: $color-white;
  font-size: 1.6rem;
  font-weight: 400;
}
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
