<template>
  <div>
    <!-- Le Box -->
    <SearchBar
      :geoJson="geoJson"
      :chosenPlot="chosenPlot"
      :chosenPlotChanged="setAndFocusChosenPlot">
    </SearchBar>

    <!-- Le Info -->
    <InfoPanel
      :chosenPlot="chosenPlot">
    </InfoPanel>

    <!-- Le Map -->
    <PlotMap
      :geoJson="geoJson"
      :plotToFocusOn="plotToFocusOn"
      :chosenPlot="chosenPlot"
      :plotClicked="setChosenPlot">
    </PlotMap>
  </div>
</template>

<script>
import axios from 'axios'
import toGeoJson from '@mapbox/togeojson'
import PlotMap from './PlotMap.vue'
import SearchBar from './SearchBar.vue'
import InfoPanel from './InfoPanel.vue'
import queryString from 'query-string'

export default {
  name: 'app',

  components: {
    PlotMap,
    SearchBar,
    InfoPanel
  },

  data() {
    return {
      geoJson: null,
      chosenPlot: null,
      plotToFocusOn: null
    }
  },

  mounted() {
    axios({
      url: 'https://www.google.com/maps/d/kml?forcekml=1&mid=1RWNEC7Kz-s3GvVbBN-1dqg-5f_YEKhFf',
      responseType: 'document'
    }).then(res => {
      this.geoJson = mergeDuplicateFeatures(toGeoJson.kml(res.data));

      const plotNumber = getPlotNumberFromUrl();

      if (plotNumber !== null) {
        const plot = this.geoJson.features.find(feature => {
          return feature.properties.name === '#' + plotNumber;
        });

        this.setAndFocusChosenPlot(plot);
      }
    });

    function mergeDuplicateFeatures(geoJson) {
      const featuresByName = {};
      const deduplicatedFeatures = [];

      for (const feature of geoJson.features) {
        const previouslyEncounteredFeature = featuresByName[feature.properties.name];

        if (previouslyEncounteredFeature) {
          Object.assign(previouslyEncounteredFeature.properties, feature.properties);
        } else {
          featuresByName[feature.properties.name] = feature;
          deduplicatedFeatures.push(feature);
        }
      }

      return {
        ...geoJson,
        features: deduplicatedFeatures
      };
    }
  },

  methods: {
    setAndFocusChosenPlot(chosenPlot) {
      this.setChosenPlot(chosenPlot);
      this.plotToFocusOn = chosenPlot;
    },

    setChosenPlot(chosenPlot) {
      this.chosenPlot = chosenPlot;
    }
  }
}

function getPlotNumberFromUrl() {
  const url = findUrl();

  if (!url) {
    return null;
  }

  return queryString.parseUrl(url).query.plotNumber || null;
}

function findUrl() {
  return (window.location != window.parent.location)
    ? document.referrer
    : document.location.href;
}

</script>

<style lang="css">
  #app {

  }
</style>
