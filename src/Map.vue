<template>
  <div id="map" ref="map"></div>
</template>

<script>
export default {
  name: 'map',

  mounted() {
    console.log('dildo perse saatana')

    window.woodinavia.googleMapsPromise.then(google => {
      const map = new google.maps.Map(this.$refs.map, {
        zoom: 4,
        center: {lat: -25.363, lng: 131.044}
      });
    });
  }
}
</script>

<style lang="css">
  #map {
    background: '#f00';
    width: 500px;
    height: 500px;
  }
</style>
