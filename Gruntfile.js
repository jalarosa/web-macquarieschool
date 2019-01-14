module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    encoding: {
      options: {
        encoding: 'ISO-8859-1'
      },
      files: {
        src: ['www/**/*', 'resources/messages/**/*']
      }
    },
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'www/js',
          src: '**/*.js',
          dest: 'public/js'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'www/css',
          src: ['*.css', '*/*.css', '!*.min.css'],
          dest: 'public/css',
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
            src: ['**/*.{png,jpg,svg,gif,ico}'],
            dest: 'public/images/'
          },
          {
            expand: true,
            cwd: 'www/bat/',
            src: ['**/*.php'],
            dest: 'public/bat/'
          }
        ]
      }
    },
    i18n_template: {
      build: {
        options: {
          defaultLocale: 'ar',
          locales: ['es', 'en'],
          messagesPath: 'resources/messages',
          basePath: 'www',
          forceRefresh: true
        },
        files: {
          'public/lang': ['www/*.html']
        }
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
  grunt.loadNpmTasks('grunt-i18n-template');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-encoding');
  // Default task(s).
  grunt.registerTask('default', ['encoding', 'i18n_template', 'copy', 'uglify', 'cssmin']);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html');

};