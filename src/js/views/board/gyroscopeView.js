
/*
 *
 *  Sept. 9th 2014
 *
 *
 *  This file is substantially below Carbon Origins
 *  quality standards.  It should be refactored before
 *  any more shit is stuffed into it.
 *             -- Will
 *
 */

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
      self.get('figure').castShadow = true;
      self.get('figure').receiveShadow = true;

      // self.set('camera', new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000 ));
      // self.get('camera').position.set( 0, 0, 150 );

      self.set('camera', new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 ));
      self.get('camera').position.set( 0, 0, 250 );

      self.set('scene', new THREE.Scene());
      self.background();
      self.get('scene').add(self.get('figure'));

      self.set('renderer', new THREE.WebGLRenderer( { antialias: true } ));
      self.get('renderer').setSize(window.innerWidth, window.innerHeight);

      self.get('renderer').setClearColor( self.get('scene').fog.color, 1 );

      self.get('renderer').gammaInput = true;
      self.get('renderer').gammaOutput = true;

      self.get('renderer').shadowMapEnabled = true;
      self.get('renderer').shadowMapCullFace = THREE.CullFaceBack;

      $('.gyroscope').append(self.get('renderer.domElement'));

      $(window).resize(function() {
        self.get('camera').aspect = window.innerWidth / window.innerHeight;
        self.get('camera').updateProjectionMatrix();

        self.get('renderer').setSize( window.innerWidth, window.innerHeight );
      });

      self.animate();
    });
  },

  background: function() {
    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 ),
        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );

    /* fog */
    this.get('scene').fog = new THREE.Fog( 0xffffff, 1, 5000 );
    this.get('scene').fog.color.setHSL( 0.6, 0, 1 );

    /* lights */
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

    /* ground */
    var groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
    var groundMat = new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0xffffff, specular: 0x050505 } );
    groundMat.color.setHSL( 0.095, 1, 0.75 );

    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -33;
    this.get('scene').add(ground);

    ground.receiveShadow = true;

    /* sky */
    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
      topColor:    { type: "c", value: new THREE.Color( 0x0077ff ) },
      bottomColor: { type: "c", value: new THREE.Color( 0xd8eaff ) },
      offset:    { type: "f", value: 33 },
      exponent:  { type: "f", value: 0.9 }
    }
    uniforms.topColor.value.copy( hemiLight.color );

    this.get('scene').fog.color.copy( uniforms.bottomColor.value );

    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
    var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

    var sky = new THREE.Mesh( skyGeo, skyMat );
    this.get('scene').add(sky);
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
