App.BoardTemperatureView = Ember.View.extend({
  didInsertElement: function() {
    $(document).ready(function() {
      var tau = 6.283185307179586;

      ThreeBox.preload([
        'assets/shaders/snippets.glsl.html',
      ], function () {
        var el = document.getElementById('graph');
        var mathbox = window.mathbox = mathBox(el, {
          alpha:          true,
          cameraControls: true,
          cursor:         true,
          controlClass:   ThreeBox.OrbitControls,
          elementResize:  false,
          fullscreen:     true,
          screenshot:     true,
          stats:          false,
          scale:          1,
        }).start();

        mathbox.world().tRenderer().setClearColorHex(0x000000, 0);

        // Viewport camera/setup
        mathbox.viewport({
          type: 'cartesian',
          range: [[-3, 3], [-2, 2], [-1, 1]],
          scale: [1, 1, 1],
        })
        .camera({
          orbit: 3.5,
          phi: tau/6,
          theta: 0.3,
        })
        .transition(300)

        // Axes
        .axis({
          id: 'a',
          axis: 0,
          color: 0xa0a0a0,
          ticks: 5,
          lineWidth: 2,
          size: .05,
          labels: true,
        })
        .axis({
          id: 'b',
          axis: 1,
          color: 0xa0a0a0,
          ticks: 5,
          lineWidth: 2,
          size: .05,
          zero: false,
          labels: true,
        })
        .axis({
          id: 'c',
          axis: 2,
          color: 0xa0a0a0,
          ticks: 5,
          lineWidth: 2,
          size: .05,
          zero: false,
          labels: true,
        })

        // Grid
        .grid({
          axis: [0, 2],
          color: 0xc0c0c0,
          lineWidth: 1,
        })
      });
    });
  }
});
