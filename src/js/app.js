/*
 *  All requires go here and are global
 *  across all of our js.
 */
var nino = require('nino'),
    fs   = require('fs');

window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('boards', function() {
    this.route('index');
  });

  this.resource('board', { path: '/boards/:board_id' }, function() {
    this.route('gyroscope');
  });
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('boards');
  }
});

App.BoardsIndexRoute = Ember.Route.extend({
  controllerName: 'boards',
  renderTemplate: function() {
    this.render({
      outlet: 'boards'
    });
  }
});

// App.BoardGyroscopeRoute = Ember.Route.extend({
//   controllerName: 'streams'
// });
