var gobble = require( 'gobble' );
var sander = gobble.sander;
var Promise = sander.Promise;

var path = require( 'path' );
var Mocha = require('mocha');

module.exports = function mocha ( inputdir, options, cb ) {
  options = options || {};

  var mocha = new Mocha( options );

  options.testDir = options.testDir || 'test';
  mocha.files = sander.readdirSync( inputdir, options.testDir ).filter( n => n.endsWith('.js') ).map(function ( file ) {
    return path.join( inputdir, options.testDir, file );
  });

  mocha.run(function ( failures ) {
    mocha.files.forEach(function ( file ) {
      delete require.cache[ file ];
    });

    if (options.reportOnly) {
      cb();
    } else if (failures > 0) {
      cb(new Error('Mocha runner reported some failures.'));
    } else {
      cb();
    }
  });
};
