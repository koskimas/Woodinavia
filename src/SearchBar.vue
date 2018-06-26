<template>
  <div>
    <multiselect
      v-model="plotOptionSelectedInSearch"
      :options="plotOptions"
      placeholder="Search"
      label="label"
      track-by="label"
      :showLabels="false">
    </multiselect>
  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'
import parseTextFromHtml from './utils/parseHtml'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'SearchBar',

  components: {
    Multiselect
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
  .multiselect__tags {
    border-radius: 0px;
  }

  .multiselect .multiselect__option--selected {
    background: #2588ce91;
    color: #fff;
  }

  .multiselect .multiselect__option--highlight {
    background: #2588ce91;
  }
</style>
