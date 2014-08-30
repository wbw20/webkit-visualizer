App.DataView = Ember.View.extend({
  chart: null,
  source: null,

  pushData: function(obj, key, value) {
    if (!this.get('chart')) { return; }

    this.get('points').push(this.get('data'));

    this.get('chart').load({
      columns: [
        this.get('points').valueOf()
      ]
    });
  }.observes('data'),

  didInsertElement: function() {
    this.get('points').push(this.get('data'));

    this.set('chart', c3.generate({
      type: 'spline',
      data: {
        columns: [
          this.get('points').valueOf()
        ]
      },
      axis: {
        y: {
          max: 40,
          min: 0
        }
      }
    }));

    $('.chart').append(this.get('chart').element);
  }
});
