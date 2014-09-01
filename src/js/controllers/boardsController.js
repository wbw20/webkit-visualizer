App.BoardsController = Ember.ArrayController.extend({
  boards: [{
    productId: 'Apollo',
    vendorId: 'Carbon Origins'
  }, {
    productId: 'Apollo',
    vendorId: 'Carbon Origins'
  }, {
    productId: 'Due',
    vendorId: 'Arduino'
  }, {
    productId: 'Apollo',
    vendorId: 'Carbon Origins'
  }],

  init: function() {
    this.constantScan();
  },

  constantScan: function() {
    // Ember.run.later(this, function() {
    //   this.scan();
    //   this.constantScan();
    // }, 200);
  },

  /* Look for more Apollos */
  scan: function() {
    var self = this;

    serialport.list(function(err, boards) {
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
