
const assert = require( "assert" );
const memco = require( "./memco.js" );

assert.equal( memco( 2, 9000000000 ), 4096, "should be equal" );

console.log( "ok" )
