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
      this.geoJson = toGeoJson.kml(res.data)
    });
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
</script>

<style lang="css">
  #app {

  }
</style>
