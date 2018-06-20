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

    plotSelectedInSearch: {
      get() {
        return this.plotOptions.find(option => option.label === (this.chosenPlot && this.chosenPlot.properties.name));
      },

      set(newPlot) {
        if (newPlot) {
          this.chosenPlotChanged(newPlot.feature);
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
