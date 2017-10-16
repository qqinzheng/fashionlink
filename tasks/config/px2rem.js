/************************************************************
 * 名称:打包将目标css中的px转换成rem
 * 日期:2017-02-21
 * 描述:
 *
 *************************************************************/

module.exports = function(grunt) {

    var config = {
        dist:{
            options: {
                /**目前是基于375宽高设计的，基础font-size定义成 */
                base: 37.5,
                fallback: false,
                fallback_existing_rem: false,
                ignore: [],
                map: false
            },
            files: {
                '.tmp/public/min/production.mobile.min.css': ['.tmp/public/min/production.mobile.min.css']
            }
        },
    }

    grunt.loadNpmTasks('grunt-px-to-rem');
    grunt.config('px_to_rem', config);
};