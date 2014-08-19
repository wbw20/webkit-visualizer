App.BoardsController = Ember.ArrayController.extend({
  boards: [],

  init: function() {
    this.scan();
  },

  constantScan: function() {
    Ember.run.later(this, function() {
      this.scan();
      this.constantScan();
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
  }
});
