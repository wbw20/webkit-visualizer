App.StreamsController = Ember.ObjectController.extend({
  stream: {
    accelerometer: {
      x: 0,
      y: 0,
      z: 0
    }
  },

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
