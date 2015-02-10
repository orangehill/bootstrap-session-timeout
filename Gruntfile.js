'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      dist: {
        src: ['dist/bootstrap-session-timeout.js']
      }
    },
    watch: {
      dist: {
        files: '<%= jshint.dist.src %>',
        tasks: ['jshint:dist']
      }
    },
    uglify: {
        dist: {
          files: {
            'dist/bootstrap-session-timeout.min.js': ['<%= jshint.dist.src %>']
          }
        }
      }
  });

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('min', ['jshint', 'uglify']);
};
