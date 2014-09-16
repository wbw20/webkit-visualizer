App.BoardGraphView = Ember.View.extend({
  tau: 6.283185307179586,
  dragDistance: 0.2,
  mathbox: null,
  xData: null,
  yData: null,
  zData: null,
  currentAxis: null,
  dataBinding: 'controller.data',

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
        id: 'x',
        axis: 0,
        color: 0xa0a0a0,
        lineWidth: 2,
        size: .05,
        zero: false
      })
      .axis({
        id: 'y',
        axis: 1,
        color: 0xa0a0a0,
        lineWidth: 2,
        size: .05,
        zero: false
      })
      .axis({
        id: 'z',
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

      self.get('controller').constantSample();
    });
  },

  onData: function(value) {
    this.addPoint([value.data.temperature, 0, 0], 0xff0000);
  },

  drag: function(event) {
    this.detectAxisCollision(event.originalEvent);
  },

  dragEnd: function(event) {
    var vector = this.get('controller.vector'),
        axis = this.get('currentAxis');

    if (axis) {
      this.set(axis, vector);
    }

    this.resetAxes();
    this.set('currentAxis', null);
  },

  drawLine: function(start, end, color) {
    var scene = this.get('mathbox').world().tScene();

    var material,
        geometry,
        line;

    material = new THREE.LineBasicMaterial({
        color: color
    });

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(start[0], start[1], start[2]));
    geometry.vertices.push(new THREE.Vector3(end[0], end[1], end[2]));

    line = new THREE.Line(geometry, material);
    scene.add(line);

    return line;
  },

  /*
   *  Return the closest distance between a THREE.js Ray and a vector
   *
   *
   *  Example:
   *
   *    intersect(ray, {
   *      slope: [2, 0, 10],
   *      offset: [-10, 2, -9]
   *    });
   */
  distance: function(ray, vector) {
    var directional,
        separational,
        distance1,
        distance2,
        point1,
        point2;

    var raySlope = [ray.direction.x, ray.direction.y, ray.direction.z],
        rayOffset = [ray.origin.x, ray.origin.y, ray.origin.z];

    directional = this.dot(raySlope, vector.slope);

    /* are they parallel? */
    if (directional == 1) {
      return false;
    }

    separational = this.separationProjections({
      slope: raySlope,
      offset: rayOffset
    }, vector);

    distance1 = ((separational[0] - (directional*separational[1])) / (1 - directional*directional)),
    distance2 = ((separational[1] - (directional*separational[0])) / (directional*directional - 1));

    point1 = this.add(rayOffset, this.scale(raySlope, distance1)),
    point2 = this.add(vector.offset, this.scale(vector.slope, distance2));

    return this._distance(point1, point2);
  },

  /*
   *  Distance between two points in 3-space
   */
  _distance: function(point1, point2) {
    var x = point2[0] - point1[0],
        y = point2[1] - point1[1],
        z = point2[2] - point1[2];

    return Math.sqrt(x*x + y*y + z*z);
  },

  /*
   *  Example:
   *
   *    separationProjections({
   *      slope: [0, 1, 1],
   *      offset: [-1, 4, 0]
   *    }, {
   *      slope: [2, 0, 10],
   *      offset: [-10, 2, -9]
   *    });
   */
  separationProjections: function(vector1, vector2) {
    var difference = this.subtract(vector2.offset, vector1.offset);

    return [this.dot(difference, vector1.slope),
            this.dot(difference, vector2.slope)];
  },

  /*
   *  Vector addition
   */
  add: function(vector1, vector2) {
    return [vector1[0] + vector2[0],
            vector1[1] + vector2[1],
            vector1[2] + vector2[2]];
  },

  /*
   *  Vector subtraction
   */
  subtract: function(vector1, vector2) {
    return [vector1[0] - vector2[0],
            vector1[1] - vector2[1],
            vector1[2] - vector2[2]];
  },

  /*
   *  Scale a vector by a scalar
   */
  scale: function(vector, scalar) {
    return [vector[0]*scalar, vector[1]*scalar, vector[2]*scalar]
  },

  /*
   *  Vector dot product
   */
  dot: function(vector1, vector2) {
    return vector1[0]*vector2[0] + vector1[1]*vector2[1] + vector1[2]*vector2[2];
  },

  detectAxisCollision: function(event) {
    event.preventDefault();

    var mouseX,
        mouseY;

    var projector = new THREE.Projector(),
        camera = this.get('mathbox').world().tCamera();

    var objects = [],
        objectsSearch = [],
        totalFaces = 0,
        intersected;

    mouseX = (event.pageX / window.innerWidth) * 2 - 1;
    mouseY = -(event.pageY / window.innerHeight) * 2 + 1;

    var vector = new THREE.Vector3(mouseX, mouseY, camera.near);
    projector.unprojectVector(vector, camera);

    /* LOL */
    vector.sub = function(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;

      return this;
    };

    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    var octreeObjects,
        numObjects,
        numFaces = 0,
        intersections;

    var axes = [{
      tag: '#x',
      name: 'xAxis',
      distance: this.distance(raycaster.ray, {
        slope: [1, 0, 0],
        offset: [0, 0, 0]
      })
    }, {
      tag: '#y',
      name: 'yAxis',
      distance: this.distance(raycaster.ray, {
        slope: [0, 1, 0],
        offset: [0, 0, 0]
      })
    }, {
      tag: '#z',
      name: 'zAxis',
      distance: this.distance(raycaster.ray, {
        slope: [0, 0, 1],
        offset: [0, 0, 0]
      })
    }];

    var self = this;

    /* Reset non-hovered axes */
    axes.forEach(function(axis) {
      if (axis.distance > self.dragDistance && self.get('mathbox').get(axis.tag).style.lineWidth == 5) {
        self.get('mathbox').set(axis.tag, { color: 0xa0a0a0, lineWidth: 2 });
      }
    });

    /* Find currently hovered axis */
    var min = _.min(axes, function(axis) { return axis.distance; });

    /* Color that axis if it is close enough */
    if (min.distance < this.dragDistance && this.get('mathbox').get(min.tag).style.lineWidth == 2) {
      this.get('mathbox').animate(min.tag, {
        lineWidth: 5,
        color: 0xff0000
      }, { duration: 100 });

      this.set('currentAxis', min.name);
    }
  },

  resetAxes: function() {
    this.get('mathbox').set('axis', { color: 0xa0a0a0, lineWidth: 2 });
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
    } else {
      this.get('mathbox').curve({
        id: 'point',
        n: 1,
        data: [location],
        pointSize: 15,
        color: color || 0x000000,
        points: true,
        line: false,
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

    this.get('mathbox').animate('camera', {
      orbit: (xExtent + yExtent + zExtent)*2,
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
