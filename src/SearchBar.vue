<template>
  <div>
    <v-select
        v-model="plotSelectedInSearch"
        :options="plotOptions">
    </v-select>
  </div>
</template>

<script>

import vSelect from 'vue-select'

export default {
  name: 'SearchBar',

  components: {
    vSelect
  },

  computed: {
    plotOptions() {
      if (!this.geoJson) {
        return [];
      }

      return this.geoJson.features
        .filter(feature => feature.geometry.type === 'Point')
        .map((feature) => {
          // TODO richer labels
          // TODO select with enter/whatever?
          return {
            feature,
            label: feature.properties.name
          }
        });
    },

    plotSelectedInSearch: {
      get() {
        return this.plotOptions.find(option => option.label === (this.chosenPlot && this.chosenPlot.properties.name))
      },

      set(newPlot) {
        this.chosenPlotChanged(newPlot.feature);
      }
    }
  },

  props: {
    geoJson: {
      type: Object,
      default: null
    },

    chosenPlot: {
      type: Object,
      default: null
    },

    chosenPlotChanged: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="css">

</style>
