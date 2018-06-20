<template>
  <div>
    {{baeName}}
  </div>
</template>

<script>

export default {
  name: 'InfoPanel',

  computed: {
    baeName() {
      return this.chosenPlot && JSON.stringify(this.chosenPlot.properties)
    }
  },

  props: {
    chosenPlot: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="css">

</style>
