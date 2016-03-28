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
