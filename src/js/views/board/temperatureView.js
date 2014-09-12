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
          elementResize:  true,
          fullscreen:     true,
          screenshot:     true,
          stats:          false,
          scale:          1,
        }).start();

        mathbox.world().tRenderer().setClearColorHex(0x000000, 0);

        // Viewport camera/setup
        mathbox
          // Cartesian viewport
          .viewport({
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

        // Move axis
        setTimeout(function () {
          mathbox.set('#c', { zero: true });
          mathbox.animate('#a', {
            offset: [0, 0, -1],
          }, { duration: 1500 });
          mathbox.animate('#b', {
            offset: [-3, 0, -1],
          }, { duration: 1500 });
          mathbox.animate('#c', {
            offset: [-3, 0, 0],
          }, { duration: 1500 });
        }, 3000);

        // Move axis + grid
        setTimeout(function () {
          mathbox.set('#b', { labels: false, arrow: false });
          mathbox.axis({
            id: 'd',
            axis: 1,
            offset: [3, 0, -1],
            ticks: 5,
            lineWidth: 2,
            color: 0xa0a0a0,
            labels: true,
            arrow: false,
          });
          mathbox.axis({
            id: 'e',
            axis: 1,
            offset: [-3, 0, 1],
            ticks: 5,
            lineWidth: 2,
            arrow: false,
            color: 0xa0a0a0,
          });
          mathbox.axis({
            id: 'f',
            axis: 1,
            offset: [3, 0, 1],
            ticks: 5,
            lineWidth: 2,
            arrow: false,
            color: 0xa0a0a0,
          });
          mathbox.animate('grid', {
            offset: [0, -2, 0],
          }, { duration: 1500 });
          mathbox.grid({
            axis: [0, 2],
            ticks: [2, 1],
            offset: [0, 2, 0],
            color: 0xc0c0c0,
            lineWidth: 1,
          });
          mathbox.animate('camera', { orbit: 7, phi: tau*5/8 + .2 }, { duration: 2500 });
          mathbox.animate('#a', {
            offset: [0, -2, -1],
          }, { duration: 1500 });
          mathbox.animate('#c', {
            offset: [-3, -2, 0],
          }, { duration: 1500 });

          mathbox.vector({
            n: 2,
            data: [[0, 0, 0], [1, 1, 1], [-1, -1, -1], [0, 1, .5]],
          });
        }, 6000);
      });
    });
  }
});
