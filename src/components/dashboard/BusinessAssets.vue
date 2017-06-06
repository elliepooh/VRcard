<template lang='pug'>
  .settings

    transition(name='vertical-toggle')
      .notification(v-if='message' @click='message = ""') {{ message }}

    .settings-windows
      .settings-window.card-photo
        .item-name Choose photo
        .item-photo(:style='{ backgroundImage: `url(${info.imageURL})` }')
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
        panorama: '',
        imageURL: '',
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
      router.push('/dashboard');
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
      Object.keys(this.info).forEach((key) => {
        const value = this.info[key];
        if (value) {
          this.cardsRef.child(this.cardname).child(key).set(value);
        }
      });
      this.message = 'Card updated!';
    },
    uploadPhoto(event) {
      const file = event.target.files[0];
      const storageFileRef = Firebase.assetsPhotosRef.child(this.uid);
      const task = storageFileRef.put(file);
      task.on('state_changed', () => {
        storageFileRef.getDownloadURL().then((url) => {
          this.info.imageURL = url;
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
.card-photo {
  flex: 1;
  margin-right: 5rem;
  justify-content: space-between;
}
.item-name {
  text-align: center;
  margin-bottom: 2rem;
}
.item-photo {
  min-width: 100%;
  min-height: 20rem;
  background-color: $color-darkgray;
  background-size: cover;
  background-position: center;
  border-radius: $border-radius;
}
.card-background {
  flex: 2;
}
.item-upload {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}
</style>
