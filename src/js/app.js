/*
 *  All requires go here and are global
 *  across all of our js.
 */
var fs = require('fs'),
    sp = require('serialport');

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

    this.route('graph');
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
  setupController: function(controller, model) {
    controller.set('model', model);
    this.transitionTo('board.live');
  }
})

App.BoardLiveRoute = Ember.Route.extend({
  controllerName: 'board'  
});

App.BoardGyroscopeRoute = Ember.Route.extend({
  controllerName: 'board'
});

App.BoardGraphRoute = Ember.Route.extend({
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

/* TODO: legitimize this */

function path() {
  return App.__container__.lookup('router:main').location.lastSetURL;
}

function boardRoute() {
  return /(live|graph|gyroscope)/.test(path());
}

function topShowing() {
  return $('.sidebar #top').first().css('display') === 'block';
}

function boardShowing() {
  return $('.sidebar #board').first().css('display') === 'block';
}

var showTop = function() {
  $('.sidebar #top').css('display', 'block');
  $('.sidebar #board').css('display', 'none');
}

var showBoard = function() {
  $('.sidebar #top').css('display', 'none');
  $('.sidebar #board').css('display', 'block');
}

Ember.Router.reopen({
  changeSidebar: function(one, two) {
    if (boardRoute() && topShowing()) {
      $('#top').animo({
        animation: 'fadeOutLeft',
        duration: 0.1
      }, showBoard);
    } else if (!boardRoute() && boardShowing()) {
      $('.board').animo({
        animation: 'fadeOutRight',
        duration: 0.1
      }, showTop);
    }
  }.on('didTransition')
});

/* END TODO */
