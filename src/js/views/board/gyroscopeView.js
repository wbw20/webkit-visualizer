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
      self.set('camera', new THREE.PerspectiveCamera( 75, 1, 1, 10000 ));
      self.set('camera.position.z', 1000);

      self.set('scene', result.scene);

      self.set('renderer', new THREE.CanvasRenderer());
      self.get('renderer').setSize(500, 500);

      $('.gyroscope').append(self.get('renderer.domElement'));
      self.animate();
    });
  },

  animate: function() {
    var self = this;
    var render = function () {
      requestAnimationFrame(render);

      // self.set('mesh.rotation.x', self.get('accelerometer.x'));
      // self.set('mesh.rotation.y', self.get('accelerometer.y'));
      // self.set('mesh.rotation.z', self.get('accelerometer.z'));

      self.get('renderer').render(self.get('scene'), self.get('camera'));
    };

    render();
  }
});
