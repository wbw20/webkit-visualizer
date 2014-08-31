App.CircleView = Ember.View.extend({
  templateName: 'circle',
  tagName: 'svg',
  fill: 'green',
  viewBox: '18 0 5 40',
  attributeBindings: ['fill', 'viewBox']
});
