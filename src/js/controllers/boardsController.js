App.BoardsController = Ember.ArrayController.extend({
  boards: function() {
    return [{
      id: '342532',
      type: 'Apollo'
    }, {
      id: '324324',
      type: 'Arduino Uno'
    }, {
      id: '760765',
      type: 'Arduino Uno'
    }, {
      id: '265456',
      type: 'Apollo'
    }, {
      id: '124230',
      type: 'Arduino Due'
    }];
  }.property()
});
