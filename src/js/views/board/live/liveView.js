App.BoardLiveView = Ember.View.extend({
  didInsertElement: function() {
    this.get('controller').setupStream();
  },
});
