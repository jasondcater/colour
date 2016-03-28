# Colour
Code Challenge for Planet Labs

Requires React to build
-----------
```
npm install --save react react-dom babelify babel-preset-react
```

Rebuild JSX files
-----------
```
cd ./src
jsx -w ./jsx ./js -x jsx
```

Build
-----------

```
browserify -t [ babelify --presets [ react ] ] ./src/js/colour.js -o bundle.js
```
