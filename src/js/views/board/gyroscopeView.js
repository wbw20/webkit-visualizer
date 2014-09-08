App.BoardGyroscopeView = Ember.View.extend({
  scene: null,
  camera: null,
  renderer: null,
  figure: null,
  accelerometerBinding: 'controller.data.accelerometer',

  didInsertElement: function() {
    this.get('controller').constantSample();

    var self = this;
    var loader = new THREE.ColladaLoader();
    loader.load('assets/models/apollo.dae', function (result) {
      self.set('figure', result.scene.children[0].clone());
      self.set('camera', new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000 ));
      self.get('camera').position.set( 0, 0, 100 );

      self.set('scene', new THREE.Scene());
      self.get('scene').add(self.get('figure'));

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

      self.set('figure.rotation.x', self.get('accelerometer.x'));
      self.set('figure.rotation.y', self.get('accelerometer.y'));
      self.set('figure.rotation.z', self.get('accelerometer.z'));

      self.get('renderer').render(self.get('scene'), self.get('camera'));
    };

    render();
  }
});
