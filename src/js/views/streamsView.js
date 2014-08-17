App.StreamsView = Ember.View.extend({
  templateName: 'streams',
  scene: null,
  camera: null,
  mesh: null,
  renderer: null,

  didInsertElement: function() {
    this.set('scene', new THREE.Scene());
    this.set('camera', new THREE.PerspectiveCamera( 75, 1, 1, 10000 ));
    this.set('camera.position.z', 1000);

    var geometry = new THREE.BoxGeometry( 200, 200, 200 ),
        material = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true
        });

    this.set('mesh', new THREE.Mesh( geometry, material ));
    this.get('scene').add(this.get('mesh'));

    this.set('renderer', new THREE.CanvasRenderer());
    this.get('renderer').setSize(500, 500);

    $('.streams').append(this.get('renderer.domElement'));
    this.animate();
  },

  animate: function() {
    this.bind('mesh.rotation.x', 'controller.stream.accelerometer.x');
    this.bind('mesh.rotation.y', 'controller.stream.accelerometer.y');
    this.bind('mesh.rotation.z', 'controller.stream.accelerometer.z');

    this.get('renderer').render(this.get('scene'), this.get('camera'));
  }
});
