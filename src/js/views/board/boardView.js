App.BoardView = Ember.View.extend({
  didInsertElement: function() {
    this.get('controller').setupStream();
  },

  willDestroy: function() {
    this.get('controller').teardownStream();
  }
});
