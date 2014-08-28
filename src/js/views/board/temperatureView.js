App.BoardTemperatureView = Ember.View.extend({
  temperature: function() {
    return this.get('controller.data.temperature');
  }.property('controller.data'),

  didInsertElement: function() {
    $('.chart').append(c3.generate({
      data: {
        columns: [
          ['data1', 100, 200, 150, 300, 200],
          ['data2', 400, 500, 250, 700, 300],
        ]
      }
    }).element);
  }
});
