App.BoardController = Ember.ObjectController.extend({
  board: null,
  stream: null,
  data: {
    accelerometer: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  temperature: 30,
  humidity: 70,
  pressure: 5,

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
    this.set('stream', fs.createReadStream(this.get('model.comName')));

    this.get('stream').on('data', function (data) {
      console.log('data');
    });

    // this.get('stream').write("{ \"command\": \"pressure\" }", function(err, results) {
    //   console.log('err ' + err);
    //   console.log('results ' + results);
    // });

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
