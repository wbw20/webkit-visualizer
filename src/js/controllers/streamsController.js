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
    nino.first(function(port) {
      var readStream = fs.createReadStream(port.comName);

      readStream.on('data', function (data) {
        if (self.isvalidJSON(data)) {
          console.log(JSON.parse(data));
          self.set('stream', JSON.parse(data));
        }
      });

      readStream.on('error', function (error) {
        Ember.Logger.warn('Error: ' + error);
      });
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
