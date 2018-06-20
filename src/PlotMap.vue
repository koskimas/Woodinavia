<template>
  <div class="plot-map" ref="plotMap"></div>
</template>

<script>
const HUGE_Z_INDEX = 100000000;

export default {
  name: 'PlotMap',

  props: {
    geoJson: {
      type: Object,
      default: null
    },

    chosenPlot: {
      type: Object,
      default: null
    },

    plotClicked: {
      type: Function,
      default: () => {}
    },

    plotToFocusOn: {
      type: Object,
      default: null
    }
  },

  watch: {
    geoJson(geoJson) {
      if (this.map && geoJson) {
        this.redraw();
      }
    },

    chosenPlot(chosenPlot) {
      console.log('map chosen plot changed', chosenPlot)

      if (chosenPlot) {
        const chosenName = chosenPlot.properties.name;

        Object.entries(this.markers).forEach(([name, marker]) => {
          if (name === chosenName) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            marker.setZIndex(HUGE_Z_INDEX);
          } else {
            marker.setAnimation(null)
            marker.setZIndex(this.zIndexes[name]);
          }
        })
      } else {
        Object.entries(this.markers).forEach(([name, marker]) => {
          marker.setAnimation(null);
          marker.setZIndex(this.zIndexes[name]);
        })
      }
    },

    plotToFocusOn(plotToFocusOn) {
      if (plotToFocusOn) {
        this.map.setCenter(this.markers[plotToFocusOn.properties.name].getPosition());
      }
    }
  },

  created() {
    // Do not add these to data so that vue doesn't wrap them.
    this.google = null;
    this.markers = {};
    this.forestPoly = null;
    this.map = null;
    this.zIndexes = {};
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

      if (this.forestPoly) {
        this.forestPoly.setMap(null);
      }

      Object.values(this.markers).forEach(marker => {
        marker.setMap(null);
      })



      // TODO: Such slow
      this.zIndexes = {}

      const byLat = plots.slice().sort((a, b) => b.geometry.coordinates[0] - a.geometry.coordinates[0])
      const byLng = plots.slice().sort((a, b) => b.geometry.coordinates[1] - a.geometry.coordinates[1])

      plots.forEach(plot => {
        const latIdx = byLat.indexOf(plot)
        const lngIdx = byLng.indexOf(plot)
        this.zIndexes[plot.properties.name] = latIdx + lngIdx * 10000;
      })



      this.markers = {};
      this.forestPoly = null;

      const forestCoords = forest.geometry.coordinates[0].map(coord => ({
        lat: coord[1],
        lng: coord[0]
      }));

      this.forestPoly = new google.maps.Polygon({
        paths: forestCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map
      });

      plots.forEach(plot => {
        const marker = new google.maps.Marker({
          position: {
            lng: plot.geometry.coordinates[0],
            lat: plot.geometry.coordinates[1]
          },

          zIndex: this.zIndexes[plot.properties.name],
          clickable: true,
          map: this.map
        });

        marker.addListener('click', () => {
          this.plotClicked(plot);
        });

        bounds.extend(marker.getPosition());
        this.markers[plot.properties.name] = marker;
      });

      forestCoords.forEach(coord => {
        bounds.extend(coord);
      })

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
