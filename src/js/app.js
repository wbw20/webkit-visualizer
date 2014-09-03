/*
 *  All requires go here and are global
 *  across all of our js.
 */
var fs   = require('fs'),
    serialport = require('serialport');

window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('boards', function() {
    this.route('index');
  });

  this.resource('board', { path: '/boards/:board_id' }, function() {
    this.route('live');

    this.route('accelerometer');
    this.route('gps');
    this.route('gyroscope');
    this.route('humidity');
    this.route('luminosity');
    this.route('magnetometer');
    this.route('pressure');
    this.route('temperature');
  });

  this.route('world');
  this.route('settings');
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

App.BoardIndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('board.live');
  }
})

App.BoardLiveRoute = Ember.Route.extend({
  controllerName: 'board'
});

App.BoardGyroscopeRoute = Ember.Route.extend({
  controllerName: 'board'
});

App.BoardTemperatureRoute = Ember.Route.extend({
  controllerName: 'board'
});

App.BoardPressureRoute = Ember.Route.extend({
  controllerName: 'board'
});

App.BoardHumidityRoute = Ember.Route.extend({
  controllerName: 'board'
});

App.BoardLiveRoute = Ember.Route.extend({
  controllerName: 'board'
});
