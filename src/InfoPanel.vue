<template>
  <div>
    <div class="customer-info-wrapper">
      <div class="customer-info">
        <div class="top-part">
          <div class="photo"
               v-show="hasPhoto"
               v-bind:style="customerImageBackgroundStyle">
          </div>

          <div class="no-photo-placeholder"
               v-show="!hasPhoto">

            <div class="fill-space-center">
              <div class="search-radar">
                <div class="unknown-face"></div>
              </div>
            </div>

            <p class="add-instructions">
              No photo submitted for this plot.
              <br>
              <a :href="photoSubmitMailtoUrl" target="_parent">
                Email your selfie to us</a> and we will add it.
            </p>
          </div>
        </div>

        <div class="name">
          {{ plotName }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .customer-info-wrapper {
    padding: 10px;
    width: 100%;
    max-width: 440px;
    margin: 0 auto;

    height: 100%;
    box-sizing: border-box;
    display: flex;
  }

  .customer-info {
    flex-grow: 1;

    display: flex;
    flex-direction: column;

    border-radius: 8px;
    border: 1px solid rgba(60, 60, 60, 0.2);

    box-shadow: 0px 2px 1px rgba(60, 60, 60, 0.5);
  }

  .top-part {
    flex: 1 1 auto;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    /* Ehhh... why is this needed? */
    margin-top: -1px;

    display: flex;
  }

  .photo {
    flex: 1 1 auto;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 10%;
  }

  .no-photo-placeholder {
    flex: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fill-space-center {
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .no-photo-placeholder .search-radar {
    padding: 66px;
    border: 2px solid #2588ce;
    border-radius: 50%;
    background-color: #2588ce91;
  }

  .no-photo-placeholder .unknown-face {
    width: 80px;
    border: 2px solid #fafafa;
    border-radius: 50%;

    background-image: url('https://cdn.rawgit.com/koskimas/Woodinavia/ff221d595e032b26169133b5bfeb178257294b28/assets/unknown_face.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #3f3c38;
  }

  .no-photo-placeholder .unknown-face::before {
    display: block;
    content: ' ';
    margin-top: 100%
  }

  .no-photo-placeholder a {
    color: #a26b25 !important;
    text-decoration: none !important;
  }

  .no-photo-placeholder a:hover {
    color: #1c1d1d !important;
  }

  .name {
    padding: 0.666rem;
    font-size: 125%;
    margin-top: 0.25rem;
  }

  .add-instructions {
    margin: 10px 0;
    text-align: center;
    line-height: 1.3;
  }
</style>

<script>

import parseTextFromHtml from './utils/parseHtml'

export default {
  name: 'InfoPanel',

  computed: {
    plotId() {
      return this.chosenPlot.properties.name;
    },

    hasPhoto() {
      return !!this.chosenPlot.properties.gx_media_links;
    },

    customerImageBackgroundStyle() {
      if (this.hasPhoto) {
        return {
          backgroundImage: `url('${this.chosenPlot.properties.gx_media_links}')`
        };
      } else {
        return {};
      }
    },

    plotName() {
      const plotHtmlDescription = this.chosenPlot.properties.description;

      let textInHtml = parseTextFromHtml(plotHtmlDescription);

      if (textInHtml) {
        return `${textInHtml}, ${this.plotId}`;
      } else {
        return this.plotId;
      }
    },

    photoSubmitMailtoUrl() {
      return `mailto:info@woodinavia.com?subject=Forest Owner Name and Selfie for Plot ${this.plotId}`;
    }
  },

  props: {
    chosenPlot: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="css">

</style>
