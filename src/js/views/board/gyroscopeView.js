App.BoardGyroscopeView = Ember.View.extend({
  scene: null,
  camera: null,
  mesh: null,
  renderer: null,
  accelerometerBinding: 'controller.data.accelerometer',

  didInsertElement: function() {
    this.get('controller').constantSample();

    var self = this;
    var loader = new THREE.ColladaLoader();
    loader.load('assets/models/apollo.dae', function (result) {
      self.set('camera', new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000 ));
      self.get('camera').position.set( 0, 0, 10 );

      self.set('scene', new THREE.Scene());
      self.get('scene').add(result.scene);

      self.set('renderer', new THREE.CanvasRenderer());
      self.get('renderer').setSize(window.innerWidth, window.innerHeight);

      $('.gyroscope').append(self.get('renderer.domElement'));
      self.animate();
    });
  },

  animate: function() {
    var self = this;
    var render = function () {
      requestAnimationFrame(render);

      self.set('camera.rotation.x', self.get('accelerometer.x'));
      self.set('camera.rotation.y', self.get('accelerometer.y'));
      self.set('camera.rotation.z', self.get('accelerometer.z'));

      self.get('renderer').render(self.get('scene'), self.get('camera'));
    };

    render();
  }
});
