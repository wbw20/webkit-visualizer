App.BoardsController = Ember.ArrayController.extend({
  boards: [],

  init: function() {
    this.scan();
  },

  /* Look for more Apollos */
  scan: function() {
    var self = this;

    nino.list(function(boards) {
      var arr = [];

      boards.forEach(function(item) {
        arr.push(item);
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
