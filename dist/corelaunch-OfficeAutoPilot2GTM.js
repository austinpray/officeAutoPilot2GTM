!function(o){$.cookie.json=!0;var e,n="officeAutoPilot2GTM: uhoh... ",r={formSelector:"moonray_order_form form",cookieKey:"oap2gtmTrans"},t=[];(window.onpopstate=function(){var o,n=/\+/g,r=/([^&=]+)=?([^&]*)/g,t=function(o){return decodeURIComponent(o.replace(n," "))},i=window.location.search.substring(1);for(e={};o=r.exec(i);)e[t(o[1])]=t(o[2])}).call();var i=function(o){return $.each(o,function(o,e){e.price=Number(e.price.replace(/[^0-9\.]+/g,""))}),o},a=function(o){var e=0;return $.each(o,function(o,n){e+=n.price*n.quantity}),e};o.orderForm=function(e){$.isArray(e)||console.error(n,"products parameter must be an array"),t=e,$("div."+r.formSelector).submit(function(){o.setCookie(t)})},o.setCookie=function(){$.cookie(r.cookieKey,t,{expires:7})},o.send=function(){var o=$.cookie(r.cookieKey);void 0!==o&&(o=i(o),dataLayer.push({event:"trackTrans",transactionId:e.transaction_id,transactionCurrency:"USD",transactionProducts:o,transactionAffiliation:"",transactionTotal:a(o),transactionTax:"",transactionShipping:""}),$.removeCookie(r.cookieKey))}}("undefined"==typeof exports?this.officeAutoPilot2GTM={}:exports);