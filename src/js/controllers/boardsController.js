App.BoardsController = Ember.ArrayController.extend({
  needs: 'streams',
  boards: [],

  init: function() {
    var self = this;
    nino.serial(function(err, data) {
      if (err) {
        Ember.Logger.warn('Error: ' + err);
      } else if (self.isvalidJSON(data)) {
        console.log(JSON.parse(data));
      }
    });
    this.constantScan();
  },

  isvalidJSON: function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  },

  constantScan: function() {
    Ember.run.later(this, function() {
      this.scan();
      this.constantScan();
      console.log('rescan');
    }, 200);
  },

  /* Look for more Apollos */
  scan: function() {
    var self = this;

    nino.list(function(boards) {
      var arr = [];

      boards.forEach(function(item) {
        if (!_.contains(self.get('boards'), item)) {
          arr.push(item);
        }
      });

      self.set('boards', arr);
    });
  },

  actions: {
    click: function(id) {
      alert(id);
    }
  }
});
