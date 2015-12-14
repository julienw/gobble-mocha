# gobble-mocha
> EXPERIMENTAL! Beware; there be dragons!

## Installation
```
npm install --save-dev gobble-mocha
```

## Example
```js
var src = gobble( 'src' );

var unitTests = gobble([
  src.moveTo( 'src' ),
  gobble( 'unit-tests' ).moveTo( 'tests' )
])
  .observe( 'mocha' );

// build the app
var app = src
  .transform( 'rollup', {
    entry: 'app.js',
    format: 'iife'
  });


module.exports = gobble([ unitTests, app ]);
```
