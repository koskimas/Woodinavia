<template>
  <div>
    <v-select
        class="sharp-border-select"
        v-model="plotOptionSelectedInSearch"
        :options="plotOptions">
    </v-select>
  </div>
</template>

<script>

import vSelect from 'vue-select'
import parseTextFromHtml from './utils/parseHtml'

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
          if (!this.chosenPlot || this.chosenPlot.properties.name !== option.plot.properties.name) {
            this.chosenPlotChanged(option.plot);
          }
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

<style>
  .sharp-border-select.v-select .dropdown-toggle {
    border: none;
    border-bottom: 1px solid rgba(60, 60, 60, 0.2);
    border-radius: 0;
  }

  /* Fix borked vue-select styling with non-multi-select */
  .v-select input[type=search] {
    position: absolute !important;
  }
  .v-select .dropdown-toggle .clear {
    bottom: 4.5px !important;
  }
</style>
