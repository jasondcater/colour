Colour
======
Code Challenge for Planet Labs

Project Requirements
--------------------
Implement a simple web application to display a user-entered color.

There should be at least two visible items on the page: an input box and a div with a border (so you know it's there even when the color is the same as the page color). The div should show whatever color the user supplies in the input dynamically ("purple", "#0f0", "#fff000", etc.).

0. Persist the previous color should the input be invalid.
0. In addition, pressing enter in the input box should have no effect.
0. The input box should initially prompts the user with something like "Enter a color or code".
0. Feel free to extend the application any way you see fit, or talk about potential extensions.
0. Use a modern Javascript MV* library like React, Backbone, Ember, Angular, etc.

Requires React to build
-----------------------
```
npm install --save react react-dom babelify babel-preset-react
```

Rebuild JSX files
-----------------
```
cd ./src
jsx -w ./jsx ./js -x jsx
```

Build
-----

```
browserify -t [ babelify --presets [ react ] ] ./src/js/colour.js -o bundle.js
```

About
-----

* The small diddy is built using React and packaged using Browserify.
* All commom HTML Color names are valid.
* Once a vaild color name or hexidecimal value is detected the application will update the palette.
* A timeout is inlcluded for hexidecimal values of three digits. Assuming a three digit value IS NOT intended we delay the processing of the color code to see if there will be a fourth digit.
* The inverse and lumocity shifted color, of the selected color, is used as the border for the palette and input.

"Potential Extensions"
----------------------
* Include a color picker. 
* Include a color name list.
* If a color code corresponds to a color name, resovle the color name for the user.
* Provide secondary, tertiary and complementary color palette for selected color.