import Vue from 'vue';
import App from './App.vue';

window.woodinavia = {};
window.woodinavia.resolveMapsPromise = null;

window.woodinavia.googleMapsPromise = new Promise(resolve => {
  window.woodinavia.resolveMapsPromise = resolve;
});

window.initMap = () => {
  window.woodinavia.resolveMapsPromise(google)
};

new Vue({
  el: '#app',
  render: h => h(App)
});
