App.BoardTemperatureView = Ember.View.extend({
  temperature: function() {
    return this.get('controller.data.temperature');
  }.property('controller.data'),

  didInsertElement: function() {
  }
});
