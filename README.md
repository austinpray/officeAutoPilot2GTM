OfficeAutoPilot2GTM.js
===

what
---
So, you have an e-commerce system that uses OfficeAutoPilot. It has two elements:
- A "shopping cart" page where the user inputs their information
- A "thank you" page where the user is redirected after a successful transaction

OfficeAutoPilot2GTM.js allows you to set up what you want to send to Google Tag Manger
on the "shopping cart page" and send the data to the thank you page if and only if
they are redirected following a successful transaction

installation
---
(Note: all these dependencies are located in the `dist/` folder)

 1. make sure jQuery is included in your asset pipeline
 2. make sure jQuery.cookie is included **AFTER** jQuery
 3. verify that the Google Tag Manager code in included **immediately after the opening of the body tag**
 4. include `corelaunch-OfficeAutoPilot2GTM.js` in your asset pipeline **LAST**

dependencies
---

- [jquery](https://github.com/jquery/jquery): ~2.1.0
- [jquery-cookie](https://github.com/carhartl/jquery-cookie): ~1.4.0

༼ つ ◕\_◕ ༽つ  THE DOCUMENTATION ༼ つ ◕\_◕ ༽つ
---
Read it.

[**Read the documentation**](https://rawgithub.com/Corelaunch/officeAutoPilot2GTM/master/docs/index.html)


usage
---

### Page with the order form
```html
<!-- include our custom library -->
<script src="corelaunch-OfficeAutoPilot2GTM.js"></script>
<!-- run the form page function -->
<script>
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
</script>
```

### Thank you page
```html
<!-- include our custom library -->
<script src="corelaunch-OfficeAutoPilot2GTM.js"></script>

<script>
  officeAutoPilot2GTM.send();
</script>
```

examples
---
Fully implemented examples are available in this repository:
- [index.html](index.html) - the page where the "cart" is displayed
- [thankyou.html](thankyou.html) - the page where the user is redirected when the transaction is successful

development
---
*For hackers only*

To install dependencies:
```bash
npm install && bower install
```

To compile `dist/`:

```bash
gulp
```

To build the entire project with documentation:

```bash
gulp build
```
