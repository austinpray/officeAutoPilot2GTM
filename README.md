OfficeAutoPilot2GTM.js
===

wut
---
So, you have

installation
---
(Note: all these dependencies are located in the `dist/` folder)

 1. make sure jQuery is included in your asset pipeline
 2. make sure jQuery.cookie is included **AFTER** jQuery
 3. verify that the Google Tag Manager code in included in the header
 4. include `corelaunch-OfficeAutoPilot2GTM.js` in your asset pipeline **LAST**

dependencies
---

- [jquery](https://github.com/jquery/jquery): ~2.1.0
- [jquery-cookie](https://github.com/carhartl/jquery-cookie): ~1.4.0

usage
---
### All pages
```html
<!-- inside the <head> tag -->

```

### Page with the order form
```html
<!-- copy paste the order from from OAP/Ontraport here -->
<script>

</script>
```

### Thank you page
```html
<!-- whatever you want -->
<script>
  cl-oap2gtm.
</script>
```

examples
---
Fully implemented examples are available in this repository:
- [index.html](index.html) - the page where the "cart" is displayed
- [thankyou.html](thankyou.html) - the page where the user is redirected when the transaction is successful


developement
---
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
