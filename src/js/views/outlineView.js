App.OutlineView = Ember.View.extend({
  templateName: 'outline',
  tagName: 'svg',
  fill: 'none',
  viewBox: '200 0 5 200',
  attributeBindings: ['fill', 'viewBox']
});
