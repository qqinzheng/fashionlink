/************************************************************
 * 名称:开发模式 browser-sync 任务
 * 日期:2017-03-24
 * 作者:Beven
 * 描述:
 *      用于同步自动刷新浏览器,主要监听dist目录下app中所有的.html文件
 *
 *************************************************************/

module.exports = function(grunt) {

    var path = require('path');
    //创建一个browser-sync插件
    var bs = require("browser-sync").create();
    //browser-sync 实例
    var instance = null;

    grunt.registerTask('browser-sync', function() {
        if (!instance) {
            // .init 启动服务器
            instance = bs.init({
                "files": ['.tmp/public/**/*.css', '.tmp/public/**/*.js'],
                proxy:'http://localhost:1337'
            });
        }
    });
};