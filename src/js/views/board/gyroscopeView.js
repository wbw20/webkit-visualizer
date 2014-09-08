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
      self.get('camera').position.set( 0, 0, 150 );

      self.set('scene', new THREE.Scene());
      self.get('scene').add(self.get('figure'));

      self.set('renderer', new THREE.CanvasRenderer());
      self.get('renderer').setSize(window.innerWidth, window.innerHeight);

      $('.gyroscope').append(self.get('renderer.domElement'));
      self.lights();
      self.animate();
    });
  },

  lights: function() {
    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 ),
        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );

    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );

    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 50 );

    dirLight.castShadow = true;

    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;

    var d = 50;

    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;

    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.0001;
    dirLight.shadowDarkness = 0.35;

    this.get('scene').add(hemiLight);
    this.get('scene').add(dirLight);
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
