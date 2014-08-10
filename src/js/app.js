/*
 *  All requires go here and are global
 *  across all of our js.
 */
var nino = require('nino');

window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('boards');
  this.resource('board', { path: '/board/:board_id' });
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('boards');
  }
});

// nino.serial(function(error, data) {
//   if (!error) {
//     $('#output').html($('#output').html() + data);
//   } else {
//     $('#output').html('something messed up.');
//   }
// });
