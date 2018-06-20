<template>
  <div class="plot-map" ref="plotMap"></div>
</template>

<script>
export default {
  name: 'PlotMap',
  props: {
    geoJson: {
      type: Object,
      default: null
    }
  },

  watch: {
    geoJson(geoJson) {
      console.log('adjasdjsakasdlkjsajdjsa')

      if (this.map && geoJson) {
        this.redraw();
      }
    }
  },

  created() {
    // Do not add this to data so that vue doesn't wrap it.
    this.map = null
  },

  mounted() {
    window.woodinavia.googleMapsPromise.then(google => {
      this.map = new google.maps.Map(this.$refs.plotMap, {
        zoom: 4,
        center: {lat: -25.363, lng: 131.044}
      });

      console.log('map created', this.geoJson)

      if (this.geoJson) {
        this.redraw();
      }
    });
  },

  methods: {
    redraw() {
      const forest = this.geoJson.features.find(it => it.geometry.type === 'Polygon')
      const plots = this.geoJson.features.filter(it => it.geometry.type === 'Point')

      console.log(forest, plots)
    }
  }
}
</script>

<style lang="css">
  .plot-map {
    background: '#f00';
    width: 500px;
    height: 500px;
  }
</style>
