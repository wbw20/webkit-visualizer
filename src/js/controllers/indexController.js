App.IndexController = Ember.Controller.extend({
  boards: null,

  init: function() {
    this.set('boards', [{
      id: '3243252',
      type: 'Apollo 1'
    }, {
      id: '8392738',
      type: 'Apollo 2'
    }]);
  }
});
