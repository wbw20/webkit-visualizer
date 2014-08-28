App.BoardController = Ember.ObjectController.extend({
  stream: null,
  data: {
    accelerometer: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  temperature: 10,

  init: function() {
    var self = this;
    nino.first(function(port) {
      self.setupStream(port);
    });
  },

  setupStream: function(port) {
    var self = this;
    this.set('stream', fs.createReadStream(port.comName));

    this.get('stream').on('data', function (data) {
      if (self.isvalidJSON(data)) {
        self.set('data', JSON.parse(data));
        self.set('data.temperature', self.get('temperature') + Math.random() * 0.7);
      }
    });

    this.get('stream').on('error', function (error) {
      Ember.Logger.warn('Error: ' + error);
    });
  },

  teardownStream: function() {
    this.get('stream').close();
    this.set('stream', null);
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
