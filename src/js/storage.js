App.Storage = Ember.Object.extend({
  connection: null,
  database: 'storage',

  connect: function() {
    this.set('connection', openDatabase(this.get('database'), '1.0', 'Local Apollo Storage', 2 * 1024 * 1024));
  }
});

/* all controllers will have this.get('storage') */
App.register('storage:main', App.Storage);
App.inject('controller', 'storage', 'storage:main');
