'use strict'

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    account: grunt.file.readJSON("account.json"),
    screeps: {
      options: {
        email: '<%= account.email %>',
        password: '<%= account.password %>',
        branch: '<%= account.branch %>'
      },
      dist: {
        src: ['default/*.js']
      }
    }
  });
  grunt.registerTask("default", ['screeps']);
}