App.DataView = Ember.View.extend({
  chart: null,
  data: ['temperature'],
  temperatureBinding: 'controller.data.temperature',

  pushData: function(obj, key, value) {
    if (!this.get('chart')) { return; }

    this.get('data').push(this.get('temperature'));

    this.get('chart').load({
      columns: [
        this.get('data').valueOf()
      ]
    });
  }.observes('controller.data'),

  didInsertElement: function() {
    this.get('data').push(this.get('temperature'));

    this.set('chart', c3.generate({
      type: 'spline',
      data: {
        columns: [
          this.get('data').valueOf()
        ]
      },
      axis: {
        y: {
          max: 40,
          min: 0
        }
      }
    }));

    $('.chart').append(this.get('chart').element);
  }
});














// App.DataView = Ember.View.extend({
//   chart: null,
//   name: null,
//   source: null,
//   data: null,
//   axis: null,
//   reading: null,

//   init: function() {
//     this.set('data', [this.get('dataName')]);
//     var binding = Ember.Binding.from('reading').to(this.get('source'));
//     binding.connect(this);
//   },

//   pushData: function(obj, key, value) {
//     if (!this.get('chart')) { return; }

//     this.get('data').push(this.get('reading'));

//     this.get('chart').load({
//       columns: [
//         this.get('data').valueOf()
//       ]
//     });
//   }.observes('reading'),

//   didInsertElement: function() {
//     this.set('chart', c3.generate({
//       type: 'spline',
//       data: {
//         columns: [
//           this.get('data').valueOf()
//         ]
//       },
//       axis: this.get('axis')
//     }));

//     $('.chart').append(this.get('chart').element);
//   }
// });
