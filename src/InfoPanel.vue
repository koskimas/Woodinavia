<template>
  <div>
    <div class="customer-info"
         v-bind:style="customerImageBackgroundStyle">
    </div>
  </div>
</template>

<style lang="text/scss" scoped>
  .customer-info {
    width: 100%;
    height: 100%;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>

<script>

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
