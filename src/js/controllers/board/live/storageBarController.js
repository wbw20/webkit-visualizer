App.StorageBarController = Ember.Controller.extend({
  progress: 10,
  width: function() {
    return this.get('progress') + '%'
  }.property()
});
