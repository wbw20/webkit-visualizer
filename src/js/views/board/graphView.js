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
      });

      setTimeout(function() {
        self.addPoint([3, 3, 3], 0x00ff00);
      }, 3000);
    });
  },

  /*
   *  Add a point to the current display
   */
  addPoint: function(location, color) {
    if (!location) { return; }

    var currentRange = this.get('mathbox').get('viewport').range,
        largerRange = currentRange,
        larger = false;

    if (currentRange[0][0] > location[0]) { larger = true; largerRange[0][0] = location[0] - 5; }
    if (currentRange[0][1] < location[0]) { larger = true; largerRange[0][1] = location[0] + 5; }
    if (currentRange[1][0] > location[1]) { larger = true; largerRange[1][0] = location[1] - 5; }
    if (currentRange[1][1] < location[1]) { larger = true; largerRange[1][1] = location[1] + 5; }
    if (currentRange[2][0] > location[2]) { larger = true; largerRange[2][0] = location[2] - 5; }
    if (currentRange[2][1] < location[2]) { larger = true; largerRange[2][1] = location[2] + 5; }

    if (larger) {
      var self = this;

      this.resetDomain(largerRange, function() {
        self.get('mathbox').curve({
          id: 'point',
          n: 1,
          data: [location],
          pointSize: 15,
          color: color || 0x000000,
          points: true,
          line: false,
        });
      });
    }
  },

  /*
   *  Multiply the domain of this graph
   */
  resetDomain: function(domain, cb) {
    var viewport = this.get('mathbox').get('viewport'),
        range = viewport.range,
        scale = viewport.scale;

    var xExtent = Math.abs(domain[0][0]) + domain[0][1],
        yExtent = Math.abs(domain[1][0]) + domain[1][1],
        zExtent = Math.abs(domain[2][0]) + domain[2][1];

    this.get('mathbox').animate('viewport', {
      range: domain,
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

      if (cb) { cb(); }
    }, 500);
  }
});
