/**
 * 名称：首页业务脚本
 * 日期：2017-03-24
 * 描述：
 */

;(function () {

  /**
   * 业务脚本构造函数
   */
  function IndexAdmin () {
    this.initialize()
  }

  /**
   * 初始化
   */
  IndexAdmin.prototype.initialize = function () {
    this.initProps()
    this.initBanner()
    this.initHandlers()
    this.initViewport()
  }

  /**
   * 初始化图片延迟加载
   */
  IndexAdmin.prototype.initViewport = function () {
    $(function(){
        $(document.body).find('[data-src]').each(function () {
            this.src = $(this).data('src')
        })
    })
  }

  /**
   * 初始化属性
   */
  IndexAdmin.prototype.initProps = function () {
    this.$top = $('#backTop')
    this.$header = $('#header')
    this.headerHeight = this.$header.height()
    this.isIe = navigator.userAgent.indexOf('MSIE') > -1
  }

  /**
   * 初始化事件
   */
  IndexAdmin.prototype.initHandlers = function () {
    $(window).scroll(this.bind(this.onScrolling))
    $(document.body).on('click.event', '[data-click]', this.bind(this.onDispatchClick))
    $('.nav').on('click.nav', '.nav-item', this.bind(this.onNavigation))
  }

  /**
   * 窗体滚动
   */
  IndexAdmin.prototype.onScrolling = function () {
    var fixedCls = 'header-fixed'
    var topCls = 'show'
    var $top = this.$top
    var $body = $(document.body)
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    scrollTop > this.headerHeight ? $body.addClass(fixedCls) : $body.removeClass(fixedCls)
    scrollTop > this.headerHeight ? $top.addClass(topCls) : $top.removeClass(topCls)
  }

  /**
   * 点击回到顶部
   */
  IndexAdmin.prototype.onScrollToTop = function () {
    this.animateScrollTo(0)
  }

  /**
   * 导航
   */
  IndexAdmin.prototype.onNavigation = function (ev) {
    var $target = $(ev.srcElement || ev.target).closest('.nav-item')
    var $nav = $target.closest('.nav')
    var $navTarget = $($target.data('target'))
    var offset = $navTarget.offset()
    $nav.find('.active').removeClass('active')
    $target.addClass('active')
    this.animateScrollTo(offset.top - this.headerHeight)
  }

  /**
   * 初始化首页banner 轮播
   */
  IndexAdmin.prototype.initBanner = function () {
    var rate =1920 / 578;
    var height = $(window).width() / rate;
    $('#banner').css('height',height+'px');
    this.swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      calculateHeight: true,
      lazyLoading: true,
      mode:'horizontal',
      loop: !0,
      autoplay: 5e3,
      speed: 1e3,
      initialSlide: 0
    })
  }

  /**
   * 以动画形式滚动滚动条到指定位置
   * @param toScrollTop 要滚动到的位置
   */
  IndexAdmin.prototype.animateScrollTo = function (toScrollTop) {
      $(document.documentElement).animate({scrollTop: toScrollTop})
      $(document.body).animate({scrollTop: toScrollTop})
  }

  /**
   * 点击事件转发
   * @param ev 事件上下文
   */
  IndexAdmin.prototype.onDispatchClick = function (ev) {
    var $target = $(ev.srcElement || ev.target)
    var click = $target.data('click')
    var handler = this['on' + click]
    if (typeof handler == 'function') {
      return handler.apply(this, arguments)
    }else {
      throw new Error('not event:[on' + click + '] on IndexAdmin')
    }
  }

  /**
   * 绑定函数
   * @param handler 要代理的函数
   */
  IndexAdmin.prototype.bind = function (handler) {
    var self = this
    return function () {
      if (typeof handler == 'function') {
        return handler.apply(self, arguments)
      }
    }
  }

  /**
   * 返回一个延迟调用函数回调函数
   * @param handler 要执行的函数
   * @param interval 延迟时间间隔 单位：毫秒
   */
  IndexAdmin.prototype.delay = function (handler, interval) {
    var self = this
    return function () {
      var args = arguments
      clearTimeout(handler.___timerId)
      handler.___timerId = setTimeout(function () {
        handler.apply(self, args)
      }, interval)
    }
  }

  var index = new IndexAdmin()
}())
