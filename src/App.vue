<template>
  <div>
    <PlotMap :geoJson="geoJson"></PlotMap>
  </div>
</template>

<script>
import axios from 'axios'
import toGeoJson from '@mapbox/togeojson'
import PlotMap from './PlotMap.vue'

export default {
  name: 'app',

  components: {
    PlotMap
  },

  data() {
    return {
      geoJson: null
    }
  },

  mounted() {
    axios({
      url: 'https://www.google.com/maps/d/kml?forcekml=1&mid=1RWNEC7Kz-s3GvVbBN-1dqg-5f_YEKhFf',
      responseType: 'document'
    }).then(res => {
      this.geoJson = toGeoJson.kml(res.data)
    });
  }
}
</script>

<style lang="css">
  #app {

  }
</style>
