App.BoardsController = Ember.ArrayController.extend({
  boards: function() {
    nino.list();
  }.property()
});
