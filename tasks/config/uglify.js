/**
 * `uglify`
 *
 * ---------------------------------------------------------------
 *
 * Minify client-side JavaScript files using UglifyJS.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

  grunt.config.set('uglify', {
    dist: {
      src: ['.tmp/public/concat/production.js'],
      dest: '.tmp/public/min/production.min.js'
    },
    distMobile: {
      src: ['.tmp/public/concat/production.mobile.js'],
      dest: '.tmp/public/min/production.mobile.min.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
