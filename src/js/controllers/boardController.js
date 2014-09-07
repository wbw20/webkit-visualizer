App.BoardController = Ember.ObjectController.extend({
  board: null,
  stream: null,
  data: {
    accelerometer: {
      x: 0,
      y: 0,
      z: 0
    },
    temperature: 0,
    humidity: 0,
    pressure: 0,
  },

  flashMemory: 43,
  sdMemory: 21,

  flashMemoryStyle: function() {
    return 'width: ' + this.get('flashMemory') + '%';
  }.property(),

  sdMemoryStyle: function() {
    return 'width: ' + this.get('sdMemory') + '%';
  }.property(),

  setupStream: function() {
    if (!this.get('model.comName')) { return; }

    var self = this;
    this.set('stream', new sp.SerialPort(this.get('model.comName'), {
      baudrate: 115200
    }, false));

    this.get('stream').open(function(error) {
      if (error) {
        Ember.Logger.warn('Error: ' + error);
      }

      self.get('stream').on('data', function (data) {
        var string = data.toString();
        if (self.isvalidJSON(string)) {
          self.set('data', JSON.parse(data));
        }
      });
    });
  },

  teardownStream: function() {
    this.get('stream').close();
    this.set('stream', null);
  },

  /*
   *  Write the the currently selected device
   */
  write: function(object) {
    this.get('stream').write(JSON.stringify(object));
  },

  constantSample: function() {
    Ember.run.later(this, function() {
      this.write({
        command: 'data'
      });
      this.constantSample();
    }, 500);
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
