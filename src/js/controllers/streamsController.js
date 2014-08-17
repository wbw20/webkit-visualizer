App.StreamsController = Ember.ObjectController.extend({
  stream: null,

  init: function() {
    var self = this;
    nino.serial(function(err, data) {
      if (err) {
        Ember.Logger.warn('Error: ' + err);
      } else if (self.isvalidJSON(data)) {
        self.set('stream', JSON.parse(data));
      }
    });
  },

  isvalidJSON: function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
});
