App.WorldView = Ember.View.extend({
  didInsertElement: function() {
    L.mapbox.accessToken = 'pk.eyJ1Ijoid3dldHRlcnN0ZW4iLCJhIjoiTWF1bTM3USJ9.cA9CFVcpcM1dN9wo1PUtPQ';
    var map = L.mapbox.map('map', 'wwettersten.jcdhi36o')
      .setView([40, -74.50], 9);
    }
});
