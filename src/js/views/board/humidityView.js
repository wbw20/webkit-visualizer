App.BoardHumidityView = App.DataView.extend({
  dataBinding: 'controller.data.humidity',
  points: ['humidity'],
  axis: {
    y: {
      max: 100,
      min: 0
    }
  }
});
