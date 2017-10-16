(function(){
    BJ_REPORT.init({
        //上报 id, 不指定 id 将不上报
        id: __reportId__,
        // 指定用户 id
        uin: 1,
        // combo 是否合并上报， 0 关闭， 1 启动（默认）
        combo: 0,
        // 当 combo 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
        delay: 1000,
        // 指定上报地址
        url: __reportUrl__,
        // 忽略某个错误
        //ignore: [/Script error/i],
        // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
        random: 1,
        // 重复上报次数(对于同一个错误超过多少次不上报)  避免出现单个用户同一错误上报过多的情况
        repeat: 3
        // 扩展属性，后端做扩展处理属性。例如：存在 msid 就会分发到 monitor
        //ext: {}
    });
    //绑定所有异常场景 例如 SpyJquery , SpyModule , SpySystem
    BJ_REPORT.tryJs().spyAll();
}());