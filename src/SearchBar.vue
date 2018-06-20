<template>
  <div>
    <input v-model="searchText"/>
  </div>
</template>

<script>

export default {
  name: 'SearchBar',

  computed: {
    searchText: {
      set(searchText) {
        this._searchText = searchText;

        if (searchText.length % 2 === 0) {
          this.chosenPlotChanged(null);
        } else {
          this.chosenPlotChanged(this.geoJson.features.filter(it => it.geometry.type === 'Point')[0]);
        }
      },

      get() {
        return this._searchText;
      }
    }
  },

  props: {
    geoJson: {
      type: Object,
      default: null
    },

    chosenPlotChanged: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      _searchText: ""
    };
  }
}
</script>

<style lang="css">

</style>
