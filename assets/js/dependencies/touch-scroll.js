;(function () {

  /**
   * TouchScrollView控件构造函数
   * @param {*} options 控件构造函数
   */
  function TouchScrollView (options) {
    this.options = options
    this.$scroll = $(options.target)
    this.init()
  }

  /**
   * 初始化控件
   */
  TouchScrollView.prototype.init = function () {
    var $scroll = this.$scroll
    this.touchParams = {}
    this.translateX =0;
    $scroll.on('touchstart', this.bind(this.onTouchStart))
    $scroll.on('touchmove', this.bind(this.onTouchMove))
    $scroll.on('touchend', this.bind(this.onTouchEnd))
  }

  /**
   * 开始touch 容器
   */
  TouchScrollView.prototype.onTouchStart = function (ev) {
    var targetTouches = ev.targetTouches
    if (targetTouches.length == 1) {
      this.touchParams = {
        pageX: targetTouches[0].pageX,
        clientWidth: this.$scroll.width(),
        isMoveable: true
      }
    }
  }

  /**
   * touch移动中
   */
  TouchScrollView.prototype.onTouchMove = function (ev) {
    if (this.touchParams.isMoveable) {
      var touchParams = this.touchParams
      var clientWidth = touchParams.clientWidth;
      var touch = ev.targetTouches[0]
      var pageX = touch.pageX
      var diffX = pageX - touchParams.pageX
      var $view = this.$scroll.find('.touch-scroll-view')
      var translateX  =this.translateX;
      translateX = translateX + diffX;
      translateX = translateX>0?0:translateX;
      translateX = Math.abs(translateX)>clientWidth?-clientWidth:translateX;
      var translateXCss = 'translateX(' + translateX + 'px)'
      $view.css('transform', translateXCss)
      $view.css('-webkit-transform', translateXCss)
      this.translateX = translateX;
      console.log(translateX);
    }
  }

  /**
   * touch 结束
   */
  TouchScrollView.prototype.onTouchEnd = function (ev) {
    this.touchParams = {
      isMoveable: false
    }
  }

  /**
   * 绑定一个回调函数
   * @param handler 要绑定的回调函数
   */
  TouchScrollView.prototype.bind = function (handler) {
    var contextThis = this
    if (typeof handler != 'function') {
      throw new Error('bind 参数handler 必须为Function')
    }
    return function () {
      return handler.apply(contextThis, arguments)
    }
  }

  $.fn.touchScroll = function (options) {
    var name = '___TouchScrollView'
    this.each(function () {
      var $target = $(this)
      var scrollView = $target.data(name)
      if (!scrollView) {
        options = $.extend({}, options)
        options.target = this
        scrollView = new TouchScrollView(options)
        $target.data(name, scrollView)
      }
    })
  }

  $(function () {
    $('[data-plugin="touchScroll"]').touchScroll()
  })
}())
