module.exports = function (grunt) {
  grunt.config.set('img', {
    optim: {
      src: ['.tmp/public/images/**']
    }
  })

  grunt.loadNpmTasks('grunt-img')
}
