module.exports = function(grunt) {
    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: ['app/src/js/utilities.js', 'app/src/js/ajax.js', 'app/src/js/classes/**/*.js', 'app/src/js/main.js'],
                dest: 'app/release/main.js'
            },
            css: {
                src: ['app/src/css/normalize.css', 'app/src/css/global-settings.css', 'app/src/css/*.css'],
                dest: 'app/release/main.css'
            }
        },
        babel: {
            dist: {
                files: {
                    'app/release/main.js': 'app/release/main.js'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'app/public/assets/js/main.min.js': 'app/release/main.js'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'app/public/assets/css/main.min.css': 'app/release/main.css'
                }
            }
        },
        sass: {
            options: {
                implementation: sass
            },
            dist: {
                files: {
                    'app/admin-38/css/main.css': 'app/admin/css/main.scss'
                }
            }
        },
        watch: {
            files: ['app/src/css/*.css', 'app/src/js/*.js', 'app/admin/css/main.scss'],
            tasks: ['concat', 'babel', 'uglify', 'sass', 'cssmin']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'babel', 'uglify', 'sass', 'cssmin']);
    // grunt.registerTask('default', ['watch']);

};
