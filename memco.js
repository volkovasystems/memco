"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "memco",
			"path": "memco/memco.js",
			"file": "memco.js",
			"module": "memco",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/memco.git",
			"test": "memco-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Specific memory computation.

		This will use `os.totalmem( )` for server side default maximum memory.

		This will try to partition the memory based on the partition and scale given.

		Maximum memory should be given in bytes.

		Partition and scale value should be between 1 to 10 inclusive.
		Default partition of 2 and scale of 1.

	@end-module-documentation

	@include:
		{
			"depher": "depher",
			"harden": "harden",
			"os": "os",
			"raze": "raze",
			"shft": "shft"
		}
	@end-include
*/

const depher = require( "depher" );
const harden = require( "harden" );
const raze = require( "raze" );
const shft = require( "shft" );

harden( "KB_SIZE", "kb" );
harden( "MB_SIZE", "mb" );
harden( "GB_SIZE", "gb" );

//: @server:
const DEFAULT_TOTAL_MEMORY = require( "os" ).totalmem( );
//: @end-server



const KB_SIZE_FACTOR = 1000;
const MB_SIZE_FACTOR = 1000000;
const GB_SIZE_FACTOR = 1000000000;

const FACTOR = {
	[ KB_SIZE ]: KB_SIZE_FACTOR,
	[ MB_SIZE ]: MB_SIZE_FACTOR,
	[ GB_SIZE ]: GB_SIZE_FACTOR
};

const power = Math.pow;

const memco = function memco( partition, scale, size, memory ){
	/*;
		@meta-configuration:
			{
				"partition:required": "number",
				"scale": "number",
				"size": "string",
				"memory": "number"
			}
		@end-meta-configuration
	*/

	let parameter = raze( arguments );

	let condition = ( parameter ) => ( typeof parameter == "number" && parameter >= 1 && parameter <= 10 );
	partition = depher( parameter, condition, 2 );
	scale = depher( shft( parameter ), condition, 1 );

	size = depher( parameter, [ KB_SIZE, MB_SIZE, GB_SIZE ], MB_SIZE );

	memory = depher( parameter, ( parameter ) => ( typeof parameter == "number" && parameter > 10 ), DEFAULT_TOTAL_MEMORY );

	let factor = FACTOR[ size ];

	return ( ( memory ) => {
		let factor = 2;

		while( power( 2, ++factor ) < memory );

		return power( 2, factor - 1 );
	} )( ( ( memory / factor ) * scale ) / partition );
};

module.exports = memco;
