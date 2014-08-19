App.BoardsController = Ember.ArrayController.extend({
  boards: [],

  init: function() {
    this.constantScan();
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
      if (self.get('boards').length != boards.length) {
        //TODO:  why cant we do it the easy way?
        self.set('boards', []);
        boards.forEach(function(board) {
          self.get('boards').push(board);
        });
      }
    });
  }
});
