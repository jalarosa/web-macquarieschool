module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'public/js',
          src: '**/*.js',
          dest: 'dist/assets/js'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: ['*.css', '*/*.css', '!*.min.css'],
          dest: 'dist/assets/css',
          ext: '.css'
        }]
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'public/images/',
            src: ['**/*.{png,jpg,svg,gif,ico,webp}'],
            dest: 'dist/assets/images/'
          }
        ]
      }
    },
    watch: {
      css: {
        files: ['public/css/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['public/js/*.js'],
        tasks: ['uglify:dev']
      }
    },
    json_minification: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/data',
          src: ['*.json', '!*.min.json'],
          dest: 'dist/assets/data',
          ext: '.min.json'
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-encoding');
  grunt.loadNpmTasks('grunt-json-minification');
  // Default task(s).
  grunt.registerTask('default', ['copy', 'uglify', 'cssmin', 'json_minification']);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html');

};