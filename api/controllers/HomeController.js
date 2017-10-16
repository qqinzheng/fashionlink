/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `HomeController.index()`
   */
  index: function (req, res) {
    req.setLocale('en');
    return res.view(homeView(req))
  },

  /**
   * `AppController.zh()`
   */
  lang: function (req, res) {
    req.setLocale(req.param('name'));
    return res.view(homeView(req))
  }


};

function homeView(req){
    var userAgent  =req.headers['user-agent'] ||'';
    var isMobile = userAgent.indexOf("Mobile")>-1;
    return isMobile?"homepage-mobile":"homepage";
}

