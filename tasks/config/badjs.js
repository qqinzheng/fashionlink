/************************************************************
 * 名称:解决badjs 同源策略问题
 * 日期:2017-04-01
 * 作者:Beven
 * 描述:
 *     通过try catch来规避同源策略window.onerror问题
 *
 *************************************************************/

//引入依赖>>
var path  =require('path');
var fs = require('fs');

module.exports = function (grunt) {
  
  grunt.config.set('badjs', {
    build: ['.tmp/public/**/*.js']
  });

  grunt.loadNpmTasks('grunt-contrib-badjs');
}