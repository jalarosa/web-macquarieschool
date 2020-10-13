module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'www/js',
          src: '**/*.js',
          dest: 'src/assets/js'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'www/css',
          src: ['*.css', '*/*.css', '!*.min.css'],
          dest: 'src/assets/css',
          ext: '.css'
        }]
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'www/images/',
            src: ['**/*.{png,jpg,svg,gif,ico,webp}'],
            dest: 'src/assets/images/'
          },
          {
            expand: true,
            cwd: 'www/bat/',
            src: ['**/*.php'],
            dest: 'src/assets/bat/'
          }
        ]
      }
    },
    watch: {
      css: {
        files: ['www/css/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['www/js/*.js'],
        tasks: ['uglify:dev']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-encoding');
  // Default task(s).
  grunt.registerTask('default', ['copy', 'uglify', 'cssmin']);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html');

};