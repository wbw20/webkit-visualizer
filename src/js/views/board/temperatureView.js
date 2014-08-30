App.BoardTemperatureView = App.DataView.extend({
  // name: 'temperature',
  // source: 'controller.data.temperature',
  // axis: {
  //   y: {
  //     max: 40,
  //     min: 0
  //   }
  // }
});

// App.BoardTemperatureView = Ember.View.extend({
//   chart: null,
//   data: ['temperature'],
//   temperatureBinding: 'controller.data.temperature',

//   pushData: function(obj, key, value) {
//     if (!this.get('chart')) { return; }

//     this.get('data').push(this.get('temperature'));

//     this.get('chart').load({
//       columns: [
//         this.get('data').valueOf()
//       ]
//     });
//   }.observes('controller.data'),

//   didInsertElement: function() {
//     this.get('data').push(this.get('temperature'));

//     this.set('chart', c3.generate({
//       type: 'spline',
//       data: {
//         columns: [
//           this.get('data').valueOf()
//         ]
//       },
//       axis: {
//         y: {
//           max: 40,
//           min: 0
//         }
//       }
//     }));

//     $('.chart').append(this.get('chart').element);
//   }
// });
