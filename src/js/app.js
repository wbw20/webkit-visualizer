/*
 *  All requires go here and are global
 *  across all of our js.
 */
var nino = require('nino'),
    fs   = require('fs');

window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('boards', function() {
    this.route('show', { path: '/:board_id' });

    this.resource('streams', function() {
      this.route('show');
    });
  });
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('boards');
  }
});

App.BoardsIndexRoute = Ember.Route.extend({
  controllerName: 'boards'
});

App.BoardsShowRoute = Ember.Route.extend({
  controllerName: 'streams'
});

App.StreamsIndexRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({
      into: 'boards.show',
      outlet: 'stream'
    });
  }
});
