<template>
  <div>
    <v-select
        v-model="plotOptionSelectedInSearch"
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
          return {
            plot: feature,
            label: buildLabel(feature)
          }
        });

      function buildLabel(feature) {
        let textInHtml = parseTextFromHtml(feature.properties.description);

        if (textInHtml) {
          return `${feature.properties.name} (${textInHtml})`;
        } else {
          return feature.properties.name;
        }
      }

      function parseTextFromHtml(html) {
        if (!html) {
          return null;
        }

        let wrapperDiv = document.createElement('div');
        wrapperDiv.innerHTML = html;
        return wrapperDiv.innerText.trim();
      }
    },

    plotOptionSelectedInSearch: {
      get() {
        return this.plotOptions.find(option => {
          return option.plot.properties.name ===
            (this.chosenPlot && this.chosenPlot.properties.name);
        });
      },

      set(option) {
        if (option) {
          this.chosenPlotChanged(option.plot);
        } else {
          this.chosenPlotChanged(null);
        }
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
