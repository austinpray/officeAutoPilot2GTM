$.removeCookie('oap2gtmTrans');
var dataLayer = {};
dataLayer.push = function (data) {
  dataLayer.theData = data;
}

describe("A new order form", function() {
  it("should fill the products store", function() {
    officeAutoPilot2GTM.orderForm([
      {
        'name': 'Test Product',
        'sku': '111',
        'category': 'ONLINE',
        'price': '$50.75',
        'quantity': 1
      },
      {
        'name': 'Mock Product',
        'sku': '112221',
        'category': 'ONLINE',
        'price': '$1000.00',
        'quantity': 1
      }
    ]);
    expect(officeAutoPilot2GTM.getStore()).toEqual(jasmine.any(Object));
  });
  it("should successfully set a cookie", function () {
    officeAutoPilot2GTM.setCookie();
    expect($.cookie('oap2gtmTrans')).toEqual([
      {
        'name': 'Test Product',
        'sku': '111',
        'category': 'ONLINE',
        'price': '$50.75',
        'quantity': 1
      },
      {
        'name': 'Mock Product',
        'sku': '112221',
        'category': 'ONLINE',
        'price': '$1000.00',
        'quantity': 1
      }
    ]);
  });
  it("should send the transaction to GTM", function () {
    officeAutoPilot2GTM.send();
    expect(dataLayer.theData.transactionProducts.length).toEqual(2);
  });
  it("should not have a cookie at the end", function () {
    console.log($.cookie().oap2gtmTrans);
    expect($.cookie('oap2gtmTrans')).toEqual(undefined);
  });
});
