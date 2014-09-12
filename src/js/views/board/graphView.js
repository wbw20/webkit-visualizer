App.BoardGraphView = Ember.View.extend({
  didInsertElement: function() {
    var self = this;

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
          range: [[-1, 1], [-1, 1], [-1, 1]],
          scale: [2, 2, 2],
        })
        .camera({
          orbit: 10,
          phi: tau/6,
          theta: 0.3,
        })
        .transition(300)

        // Axes
        .axis({
          id: 'a',
          axis: 0,
          color: 0xa0a0a0,
          lineWidth: 2,
          size: .05,
          zero: false
        })
        .axis({
          id: 'b',
          axis: 1,
          color: 0xa0a0a0,
          lineWidth: 2,
          size: .05,
          zero: false
        })
        .axis({
          id: 'c',
          axis: 2,
          color: 0xa0a0a0,
          lineWidth: 2,
          size: .05,
          zero: false
        })

        // Grid
        .grid({
          id: 'g',
          axis: [0, 2],
          color: 0xc0c0c0,
          tickScale: [2, 2],
          ticks: [ 2, 2],
          lineWidth: 1
        })

        mathbox.vector({
          n: 2,
          data: [[0, 0, 0], [1, 1, 1], [-1, -1, -1], [0, 1, .5]],
        });

        setTimeout(function() {
          self.resetDomain([-1, 5], [-1, 1], [-1, 1]);
        }, 3000);
      });
    });
  },

  /*
   *  Multiply the domain of this graph
   */
  resetDomain: function(x, y, z) {
    var viewport = mathbox.get('viewport'),
        range = viewport.range,
        scale = viewport.scale;

    var xExtent = Math.abs(x[0]) + x[1],
        yExtent = Math.abs(y[0]) + y[1],
        zExtent = Math.abs(z[0]) + z[1];

    mathbox.animate('viewport', {
      range: [x, y, z],
    }, { duration: 400 });

    mathbox.animate('viewport', {
      scale: [xExtent, yExtent, zExtent],
    }, { duration: 400 });

    setTimeout(function() {
      mathbox.remove('#g');
      mathbox.grid({
        id: 'g',
        axis: [0, 2],
        color: 0xc0c0c0,
        tickScale: [xExtent, zExtent],
        ticks: [xExtent, zExtent],
        lineWidth: 1
      });
    }, 500);
  }
});
