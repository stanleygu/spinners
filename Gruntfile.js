'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    spinners: {
      // configurable paths
      src: 'src',
      dist: 'dist'
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= spinners.dist %>/*.js',
            '!<%= spinners.dist %>/.git*'
          ]
        }]
      }
    },

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
      },
      demo: {
        options: {
          base: [
            '<%= spinners.dist %>',
            ''
          ]
        }
      }
    },
    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp',
          src: ['spinners.js'],
          dest: '<%= spinners.dist %>'
        }]
      }
    },

    html2js: {
      dist: {
        options: {
          module: 'stanleygu.spinners.templates',
          base: '.'
        },
        // files: [{
        //   expand: true,
        //   src: ['<%= spinners.src %>/templates/**/*.html'],
        //   dest: '<%= spinners.dist %>/templates',
        //   ext: '.html.js'
        // }]
        src: ['<%= spinners.src %>/templates/**/*.html'],
        dest: '.tmp/templates.js'

      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      dist: {
        files: {
          '<%= spinners.dist %>/spinners.min.js': [
            '<%= spinners.dist %>/spinners.js'
          ]
        }
      }
    },
    concat: {
      dist: {
        options: {
          banner: 'angular.module("stanleygu.spinners", ["stanleygu.spinners.src", "stanleygu.spinners.templates"])\n'
        },
        src: ['<%= spinners.src %>/**/*.js', '.tmp/templates.js'],
        dest: '.tmp/spinners.js'
      }
    }

  });

  grunt.registerTask('build', function() {
    grunt.task.run([
      'clean',
      'html2js',
      'concat',
      'ngmin',
      'uglify'
    ]);
  });

  grunt.registerTask('serve', [
    'build',
    'connect:demo:keepalive'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
