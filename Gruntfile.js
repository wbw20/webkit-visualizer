module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    copy: {
      modules: {
        files: [{
          cwd: 'node_modules',
          src: '**/*',
          dest: 'build/temp/node_modules',
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
          'bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        dest: 'build/temp/css/vendor.css'
      },
      vendor_js: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/handlebars/handlebars.min.js',
          'bower_components/ember/ember.min.js',
          'bower_components/animo.js/animo.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: 'build/temp/js/vendor.js'
      },
      index_js: {
        src:[
          'src/js/app.js',
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
  grunt.registerTask('package', ['copy:modules', 'copy:index', 'copy:packagejson', 'concat', 'less', 'compress', 'copy:app', 'clean']);
};
