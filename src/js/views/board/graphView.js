App.BoardGraphView = Ember.View.extend({
  tau: 6.283185307179586,
  mathbox: null,
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

      self.get('controller').constantSample();

      // el.addEventListener('mousemove', function(event) {
      //   self.onDocumentMouseMove(event);
      // }, false);

      self.drawLine();
    });
  },

  // onData: function(value) {
  //   if (!this.get('mathbox')) { return; }
  //   this.addPoint([value.data.temperature, 0, 0], 0xff0000);
  // }.observes('data.temperature'),

  dragEnd: function(event) {
    alert(event);
  },

  drawLine: function() {
    var scene = this.get('mathbox').world().tScene();

    var material,
        geometry,
        line;

    material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, 0));

    line = new THREE.Line(geometry, material);
    scene.add(line);
  },

  onDocumentMouseMove: function(event) {
    event.preventDefault();

    var mouse = new THREE.Vector2(),
        projector = new THREE.Projector(),
        camera = this.get('mathbox').world().tCamera();

    var objects = [],
        objectsSearch = [],
        totalFaces = 0,
        intersected;

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, camera );

    /* LOL */
    vector.sub = function(v) {
      this.x -= v.x;
      this.y -= v.y;

      return this;
    };

    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    var octreeObjects,
        numObjects,
        numFaces = 0,
        intersections;
    
    // if ( useOctree ) {
    //   octreeObjects = octree.search( raycaster.ray.origin, raycaster.ray.far, true, raycaster.ray.direction );
    //   intersections = raycaster.intersectOctreeObjects( octreeObjects );
    //   numObjects = octreeObjects.length;

    //   for ( var i = 0, il = numObjects; i < il; i++ ) {
    //     numFaces += octreeObjects[ i ].faces.length;
    //   }
    // } else {
      intersections = raycaster.intersectObjects(this.get('mathbox').primitives);
      numObjects = objects.length;
      numFaces = totalFaces;
    // }

    if ( intersections.length > 0 ) {
      if ( intersected != intersections[ 0 ].object ) {
        if ( intersected ) {
          intersected.material.color.setHex( baseColor );
        }

        intersected = intersections[ 0 ].object;
        intersected.material.color.setHex( intersectColor );
      }

      document.body.style.cursor = 'pointer';
    } else if ( intersected ) {
      intersected.material.color.setHex( baseColor );
      intersected = null;

      document.body.style.cursor = 'auto';
    }

    console.log(intersections.length);
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
