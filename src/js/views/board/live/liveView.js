App.BoardLiveView = Ember.View.extend({
  didInsertElement: function() {
    this.get('controller').setupStream();
    this.get('controller').write({
      command: 'digitalWrite',
      pin: 13,
      mode: 1
    });
  },

  click: function() {
    this.get('controller').write({
      command: 'digitalWrite',
      pin: 13,
      value: Math.round(Math.random())
    });
  }
});
