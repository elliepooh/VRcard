<template lang='pug'>
  .settings

    transition(name='vertical-toggle')
      .notification(v-if='message' @click='message = ""') {{ message }}

    .settings-windows
      .settings-multiple
        .settings-window.card-color
          .settings-item
            .item-name Choose color
            .item-line
              input.item-radio(
                type='radio'
                id='item1'
                value='6DF2A8'
                v-model='info.color')
              label.item-color.color-green(for='item1')
              input.item-radio(type='radio'
                id='item2'
                value='FF8F6D'
                v-model='info.color')
              label.item-color.color-orange(for='item2')
              input.item-radio(
                type='radio'
                id='item3'
                value='50E3C2'
                v-model='info.color')
              label.item-color.color-blue(for='item3')
              input.item-radio(
                type='radio'
                id='item4'
                value='BD10E0'
                v-model='info.color')
              label.item-color.color-pink(for='item4')
              input.item-radio(
                type='radio'
                id='item5'
                value='4A4A4A'
                v-model='info.color')
              label.item-color.color-gray(for='item5')
            input.item-input(
              placeholder='Enter color hex'
              name='color'
              type='text'
              v-model='info.color')

        .settings-window.card-photo
          .settings-item
            .item-name Choose photo
            .item-photo(:style='{ backgroundImage: `url(${info.photoURL})` }')
            input.item-upload(name='photo' id='photo' type='file' @change='uploadPhoto')
            label.btn(for='photo') Upload

      .settings-window.card-background
        .settings-item
          .item-name Choose your background
          .item-background(
            v-for='preview in previews'
            v-show='preview.name === info.panorama'
            v-bind:style='{ backgroundImage: `url(${preview.url})` }')
          .item-line.item-nav
            a.nav-point(
              v-for='preview in previews'
              @click='info.panorama = preview.name'
              v-bind:class='{ "point-active": preview.name === info.panorama }')

    .btn(@click='updateInfo') Accept
</template>

<script>
import Firebase from '@/appconfig/firebase';
import router from '@/router';

export default {
  name: 'businessAssets',
  props: [
    'cardsRef',
    'cardname',
    'uid',
  ],
  data() {
    return {
      info: {
        color: '',
        panorama: '',
        photoURL: '',
      },

      previewsNames: [
        'city.jpg',
        'mountains.jpg',
        'winter.jpg',
      ],
      previews: [],

      message: '',
    };
  },
  created() {
    if (!this.cardsRef) {
      router.push('/');
    } else {
      this.getCardData();
      this.getPreviews();
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
    updateInfo() {
      if (this.checkColorType()) {
        Object.keys(this.info).forEach((key) => {
          const value = this.info[key];
          if (value) {
            this.cardsRef.child(this.cardname).child(key).set(value);
          }
        });
        this.message = 'Card updated!';
      } else {
        this.message = 'Invalid color hex type';
      }
    },
    checkColorType() {
      return /^[0-9A-F]{6}$/i.test(this.info.color);
    },
    uploadPhoto(event) {
      const file = event.target.files[0];
      const storageFileRef = Firebase.assetsPhotosRef.child(this.uid);
      const task = storageFileRef.put(file);
      task.on('state_changed', () => {
        storageFileRef.getDownloadURL().then((url) => {
          this.info.photoURL = url;
        });
      });
    },
    getPreviews() {
      this.previewsNames.forEach((name) => {
        Firebase.previewsRef.child('business').child(name).getDownloadURL().then((url) => {
          this.previews.push({ name, url });
          this.info.panorama = this.info.panorama || name;
        });
      });
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

.settings-window {
  align-items: center;
}
.item-name {
  text-align: center;
  margin-bottom: 2rem;
}
.settings-multiple {
  flex: 1;
  margin-right: 8rem;
}
.card-color {
  margin-bottom: 4rem;
}
.item-radio {
  display: none;
}
.item-radio:checked + .item-color::before {
  opacity: 1;
}
.item-color {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: $border-radius;
  cursor: pointer;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -0.4rem;
    left: -0.4rem;
    width: 2rem;
    height: 2rem;
    border-width: 2px;
    border-style: solid;
    border-radius: $border-radius;
    opacity: 0;
  }
}
.color-green {
  background-color: #6DF2A8;
  &::before {
    border-color: #6DF2A8;
  }
}
.color-orange {
  background-color: #FF8F6D;
  &::before {
    border-color: #FF8F6D;
  }
}
.color-blue {
  background-color: #50E3C2;
  &::before {
    border-color: #50E3C2;
  }
}
.color-pink {
  background-color: #BD10E0;
  &::before {
    border-color: #BD10E0;
  }
}
.color-gray {
  background-color: #4A4A4A;
  &::before {
    border-color: #4A4A4A;
  }
}
.item-input {
  text-align: center;
  padding-bottom: 0.5rem;
  color: $color-text;
}
.item-photo {
  min-width: 10rem;
  min-height: 10rem;
  background-color: $color-darkgray;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  border-radius: $border-radius;
}
.item-upload {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}
</style>
