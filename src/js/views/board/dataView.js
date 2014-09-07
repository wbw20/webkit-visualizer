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
    this.get('controller').setupStream();
    this.get('points').push(this.get('data'));

    this.set('chart', c3.generate({
      type: 'spline',
      data: {
        columns: [
          this.get('points').valueOf()
        ]
      },
      axis: this.get('axis')
    }));

    $('.chart').append(this.get('chart').element);
  }
});
