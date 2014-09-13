App.BoardGraphView = Ember.View.extend({
  tau: 6.283185307179586,
  mathbox: null,

  didInsertElement: function() {
    var self = this;

    ThreeBox.preload([
      'assets/shaders/snippets.glsl.html',
    ], function () {
      var el = document.getElementById('graph');
      self.set('mathbox', mathBox(el, {
        alpha:          true,
        cameraControls: true,
        cursor:         true,
        controlClass:   ThreeBox.OrbitControls,
        elementResize:  false,
        fullscreen:     true,
        screenshot:     true,
        stats:          false,
        scale:          1,
      }));

      self.get('mathbox').start();

      self.get('mathbox').world().tRenderer().setClearColorHex(0x000000, 0);

      // Viewport camera/setup
      self.get('mathbox').viewport({
        type: 'cartesian',
        range: [[-1, 1], [-1, 1], [-1, 1]],
        scale: [2, 2, 2],
      })
      .camera({
        orbit: 10,
        phi: self.get('tau')/6,
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

      self.get('mathbox').vector({
        n: 2,
        data: [[0, 0, 0], [1, 1, 1], [-1, -1, -1], [0, 1, .5]],
      });

      setTimeout(function() {
        self.resetDomain([-1, 5], [-1, 1], [-1, 1]);
      }, 3000);

      setTimeout(function() {
        self.resetDomain([-1, 5], [-1, 1], [-10, 10]);
      }, 5000);
    });

  },

  /*
   *  Multiply the domain of this graph
   */
  resetDomain: function(x, y, z) {
    var viewport = this.get('mathbox').get('viewport'),
        range = viewport.range,
        scale = viewport.scale;

    var xExtent = Math.abs(x[0]) + x[1],
        yExtent = Math.abs(y[0]) + y[1],
        zExtent = Math.abs(z[0]) + z[1];

    this.get('mathbox').animate('viewport', {
      range: [x, y, z],
    }, { duration: 400 });

    this.get('mathbox').animate('viewport', {
      scale: [xExtent, yExtent, zExtent],
    }, { duration: 400 });

    var self = this;
    setTimeout(function() {
      self.get('mathbox').remove('#g');
      self.get('mathbox').grid({
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
