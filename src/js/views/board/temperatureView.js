App.BoardTemperatureView = App.DataView.extend({
  dataBinding: 'controller.data.temperature',
  points: ['temperature'],
  axis: {
    y: {
      max: 70,
      min: -10
    }
  }
});
