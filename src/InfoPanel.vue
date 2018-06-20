<template>
  <div>
    <div class="customer-info-wrapper">
      <div class="customer-info">
        <div class="photo"
           v-bind:style="customerImageBackgroundStyle">
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

  .photo {
    flex: 1 1 auto;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    /* Ehhh... why is this needed? */
    margin-top: -1px;
  }

  .name {
    padding: 0.666rem;
    font-size: 125%;
    margin-top: 0.25rem;
  }
</style>

<script>

import parseTextFromHtml from './utils/parseHtml'

export default {
  name: 'InfoPanel',

  computed: {
    customerImageBackgroundStyle() {
      if (this.chosenPlot.properties.gx_media_links) {
        return {
          backgroundImage: `url('${this.chosenPlot.properties.gx_media_links}')`
        };
      } else {
        return {};
      }
    },

    plotName() {
      const plotId = this.chosenPlot.properties.name;
      const plotHtmlDescription = this.chosenPlot.properties.description;

      let textInHtml = parseTextFromHtml(plotHtmlDescription);

      if (textInHtml) {
        return `${textInHtml}, ${plotId}`;
      } else {
        return plotId;
      }
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
