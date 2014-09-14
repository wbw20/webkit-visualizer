App.VectorView = Ember.View.extend({
  vector: null,
  name: null,

  templateName: 'board.graph.vector',
  classNames: ['vector'],
  draggable: 'true',
  attributeBindings: ['draggable'],

  dragStart: function(event) {
    debugger
  }
});
