App.StreamsView = Ember.View.extend({
  templateName: 'streams',
  // scene: null,
  // camera: null,
  // mesh: null,
  // renderer: null,
  // accelerometerBinding: 'controller.data.accelerometer',

  didInsertElement: function() {
    // this.set('scene', new THREE.Scene());
    // this.set('camera', new THREE.PerspectiveCamera( 75, 1, 1, 10000 ));
    // this.set('camera.position.z', 1000);

    // var geometry = new THREE.BoxGeometry( 200, 200, 200 ),
    //     material = new THREE.MeshBasicMaterial({
    //       color: 0xff0000,
    //       wireframe: true
    //     });

    // this.set('mesh', new THREE.Mesh( geometry, material ));
    // this.get('scene').add(this.get('mesh'));

    // this.set('renderer', new THREE.CanvasRenderer());
    // this.get('renderer').setSize(500, 500);

    // $('.streams').append(this.get('renderer.domElement'));
    // this.animate();
  },

  willDestroyElement: function(event) {
    // this.get('controller').teardownStream();
  },

  animate: function() {
    // var self = this;
    // var render = function () {
    //   requestAnimationFrame(render);

    //   self.set('mesh.rotation.x', self.get('accelerometer.x'));
    //   self.set('mesh.rotation.y', self.get('accelerometer.y'));
    //   self.set('mesh.rotation.z', self.get('accelerometer.z'));

    //   self.get('renderer').render(self.get('scene'), self.get('camera'));
    // };

    // render();
  }
});
