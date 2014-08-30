App.BoardPressureView = App.DataView.extend({
  dataBinding: 'controller.data.pressure',
  points: ['pressure'],
  axis: {
    y: {
      max: 7,
      min: 2
    }
  }
});
