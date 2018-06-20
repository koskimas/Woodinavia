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
    },

    selectedPlot: {
      type: Object,
      default: null
    },

    selectedPlotChanged: {
      type: Function,
      default: () => {}
    }
  },

  watch: {
    geoJson(geoJson) {
      if (this.map && geoJson) {
        this.redraw();
      }
    }
  },

  created() {
    // Do not add these to data so that vue doesn't wrap them.
    this.google = null;
    this.mapItems = [];
    this.map = null;
  },

  mounted() {
    window.woodinavia.googleMapsPromise.then(google => {
      this.google = google;

      this.map = new google.maps.Map(this.$refs.plotMap, {
        zoom: 4
      });

      this.map.setMapTypeId('satellite');

      if (this.geoJson) {
        this.redraw();
      }
    });
  },

  methods: {
    redraw() {
      const google = this.google;
      const forest = this.geoJson.features.find(it => it.geometry.type === 'Polygon');
      const plots = this.geoJson.features.filter(it => it.geometry.type === 'Point');
      const bounds = new google.maps.LatLngBounds();

      this.mapItems.forEach(item => item.setMap(null))
      this.mapItems = []

      const forestCoords = forest.geometry.coordinates[0].map(coord => ({
        lat: coord[1],
        lng: coord[0]
      }));

      forestCoords.forEach(coord => {
        bounds.extend(coord)
      })

      const forestPoly = new google.maps.Polygon({
        paths: forestCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      });

      forestPoly.setMap(this.map)
      this.mapItems.push(forestPoly)

      plots.forEach(plot => {
        const marker = new google.maps.Marker({
          position: {
            lng: plot.geometry.coordinates[0],
            lat: plot.geometry.coordinates[1]
          },
          map: this.map
        });

        bounds.extend(marker.getPosition())
        this.mapItems.push(marker)
      });

      this.map.fitBounds(bounds);
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
