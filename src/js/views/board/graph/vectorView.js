App.VectorView = Ember.View.extend({
  vector: null,
  name: null,

  templateName: 'board.graph.vector',
  classNames: ['vector'],
  draggable: 'true',
  attributeBindings: ['draggable'],

  // didInsertElement: function() {
  //   $(this.get('element')).on('drag', function(event) {
  //     console.log('drag');
  //   });
  // },

  dragStart: function(event) {
    this.set('controller.vector', this.get('vector'));
  }
});
