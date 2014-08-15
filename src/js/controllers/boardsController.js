App.BoardsController = Ember.ArrayController.extend({
  boards: [],

  init: function() {
    this.constantScan();
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
