module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    copy: {
      modules: {
        files: [{
          cwd: 'node_modules/async',
          src: '**/*',
          dest: 'build/temp/node_modules/async',
          expand: true
        }, {
          cwd: 'node_modules/serialport',
          src: '**/*',
          dest: 'build/temp/node_modules/serialport',
          expand: true
        }, {
          cwd: 'node_modules/underscore',
          src: '**/*',
          dest: 'build/temp/node_modules/underscore',
          expand: true
        }]
      },
      index: {
        files: [{
          src: 'src/index.html',
          dest: 'build/temp/index.html',
          filter: 'isFile'
        }]
      },
      glyphs: {
        files: [{
          cwd: 'bower_components/bootstrap/dist/fonts',
          src: '**/*',
          dest: 'build/temp/fonts',
          expand: true
        }]
      },
      assets: {
        files: [{
          cwd: 'src/assets',
          src: '**/*',
          dest: 'build/temp/assets',
          expand: true
        }]
      },
      packagejson: {
        files: [{
          src: 'package.json',
          dest: 'build/temp/package.json',
          filter: 'isFile'
        }]
      },
      app: {
        files: [{
          src: 'build/temp/app.zip',
          dest: 'build/app.nw',
          filter: 'isFile'
        }]
      }
    },
    concat: {
      vendor_css: {
        src: [
          'bower_components/animo.js/animate+animo.css',
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/c3/c3.css'
        ],
        dest: 'build/temp/css/vendor.css'
      },
      vendor_js: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/handlebars/handlebars.min.js',
          'bower_components/ember/ember.min.js',
          'bower_components/underscore/underscore.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/three.js/three.min.js',
          'bower_components/d3/d3.min.js',
          'bower_components/c3/c3.min.js',
          'vendor/colladaLoader.js',
          'vendor/mathBox.js',
          'bower_components/animo.js/animo.js',
        ],
        dest: 'build/temp/js/vendor.js'
      },
      index_js: {
        src:[
          'src/js/app.js',
          'build/temp/js/templates.js',
          'src/js/**/*.js'
        ],
        dest: 'build/temp/js/index.js'
      }
    },
    less: {
      main: {
        options: {
          paths: ["less"]
        },
        files: {
          "build/temp/css/index.css": "src/less/index.less",
        }
      }
    },
    emberTemplates: {
      compile: {
        options: {
          filter: 'isFile',
          templateBasePath: 'src/handlebars'
        },
        files: {
          'build/temp/js/templates.js': ['src/handlebars/**/*.handlebars']
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: 'build/temp/app.zip'
        },
        files: [{
          cwd: 'build/temp',
          src: ['**'],
          filter: 'isFile',
          expand: true
        }]
      }
    },
    clean: ["build/temp"],
    watch: {
      all: {
        files: [
          'src/**/*'
        ],
        tasks: ['default']
      }
    }
  });

  grunt.registerTask('default', ['copy', 'concat', 'less']);

  grunt.registerTask('build-quick', ['copy:index', 'copy:packagejson', 'copy:glyphs', 'copy:assets', 'emberTemplates', 'concat', 'less']);
  grunt.registerTask('package-quick', ['build-quick', 'compress', 'copy:app']);

  grunt.registerTask('build', ['copy:index', 'copy:packagejson', 'copy:glyphs', 'copy:assets', 'copy:modules', 'emberTemplates', 'concat', 'less']);
  grunt.registerTask('package', ['build', 'compress', 'copy:app', 'clean']);
};
