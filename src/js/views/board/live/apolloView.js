App.ApolloView = Ember.View.extend({
  templateName: 'outline',
  tagName: 'svg',
  viewBox: '200 0 5 200',
  transform: 'rotate(90)',
  attributeBindings: ['viewBox', 'transform'],
});
