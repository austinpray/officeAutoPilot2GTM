/**
 * officeAutoPilot2GTM
 * @author Austin Pray <austin@austinpray.com>
 * @api public
 */
(function(exports){
  var $ = jQuery || $;
  $.cookie.json = true;
  var errorPrefix = "officeAutoPilot2GTM: uhoh... ";
  /** default configuration values */
  var config = {
    'formSelector': 'moonray_order_form form',
    'cookieKey': 'oap2gtmTrans'
  };
  var productsStore;

  /** http://stackoverflow.com/a/2880929/1585343 */
  var urlParams;
  (window.onpopstate = function () {
      var match;
      var  pl     = /\+/g;  // Regex for replacing addition symbol with a space
      var  search = /([^&=]+)=?([^&]*)/g;
      var  decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
      var  query  = window.location.search.substring(1);

      urlParams = {};
      while (!!(match = search.exec(query))) {
        urlParams[decode(match[1])] = decode(match[2]);
      }
  }).call();

  /**
   * Iterate through an array of products and remove dollar signs and format strings as numbers if necessary.
   * @example
   * array = hollaHollaGetDollar(array);
   * @param { Array } products - Array of products (probably what you passed into `orderForm()`)
   * @returns { Array } parsed array
   * @api private
   */
  var hollaHollaGetDollar = function (products) {
    $.each(products, function (i, v) {
      /* http://stackoverflow.com/a/559178/1585343 */
      v.price = Number(v.price.replace(/[^0-9\.]+/g,""));
    });
    return products;
  };

  /**
   * Iterate through an array of products and get the total
   * @example
   * array = getTotal(array);
   * @param { Array } products - Array of products (probably what you passed into `orderForm()`)
   * @returns { Number } transaction total
   * @api private
   */
  var getTotal = function (products) {
    var total = 0;
    $.each(products, function (i, v) {
      total = total + (v.price * v.quantity);
    });
    return total;
  };

  /**
   * Call this on the "order form" page where the user inputs their credit card information.
   * Pass in an array of "product" objects. When the form with the class `config.formSelector` is submitted,
   * a cookie is saved to the user's browser with the key as `config.cookieKey` and the value as `products`
   *
   * @example
   * officeAutoPilot2GTM.orderForm([
   *    {
   *      'name': 'Test Product',
   *      'sku': '111',
   *      'category': 'ONLINE',
   *      'price': '$50.00',
   *      'quantity': 1
   *    },
   *    {
   *      'name': 'Mock Product',
   *      'sku': '112221',
   *      'category': 'ONLINE',
   *      'price': '$1000.00',
   *      'quantity': 1
   *    }
   *  ]);
   * @param { Array } products - an array of product objects
   * @api public
   */
  exports.orderForm = function (products) {
    if(!$.isArray(products)) {
      console.error(errorPrefix, "products parameter must be an array");
    }
    productsStore = products;
    $('div.' + config.formSelector).submit(function (e) {
      exports.setCookie();
    });
  };

  exports.getStore = function () {
    return productsStore;
  };

  exports.setCookie = function () {
    $.cookie(config.cookieKey, productsStore, { expires: 7, path: '/' });
  };
  /**
   * Call this on the "thank you" page after a successful transaction. It will grab the value stored in the cookie
   * with the key `config.cookieKey`, if it exists, and send those to the GTM datalayer. It will also try and grab any
   * URL parameters sent over from the previous page and inject those into the datalayer call
   * @example
   * officeAutoPilot2GTM.send();
   * @api public
   */
  exports.send = function () {
    var products = $.cookie(config.cookieKey);
    if(products !== undefined) {
      products = hollaHollaGetDollar(products);
      dataLayer.push({
        'event': 'trackTrans',
        'transactionId': urlParams.transaction_id || "r"+ Date.now() + "-" + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
        'transactionCurrency': 'USD',
        'transactionProducts': products,
        'transactionAffiliation': '',
        'transactionTotal': getTotal(products),
        'transactionTax': '',
        'transactionShipping': ''
      });
      $.removeCookie(config.cookieKey, { path: '/' });
    }
  };

})(typeof exports === 'undefined' ? this.officeAutoPilot2GTM = {} : exports);
