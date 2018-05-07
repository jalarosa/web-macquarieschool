module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                    src: ['*.css', '!*.min.css'],
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
                        dest:'public/images/'
                    }
                ]
            }
        },
        i18n_template: {
            dev: {
                options: {
                    defaultLocale: 'ar',
                    skipKeyRunner: true,
                    skipMessagesRunner: true,
                    messagesPath: 'resources/messages',
                    basePath: 'www'
                },
                files: {
                    'public': ['www/*.html']
                }
            },
            build: {
                options: {
                    defaultLocale: 'ar',
                    locales: ['ar', 'en'],
                    messagesPath: 'resources/messages',
                    basePath: 'www',
                    forceRefresh: true
                },
                files: {
                    'public': ['www/*.html']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-i18n-template');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Default task(s).
    grunt.registerTask('default', ['i18n_template','copy','uglify','cssmin']);


};