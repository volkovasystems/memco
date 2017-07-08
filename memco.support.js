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
              */var _defineProperty2 = require("babel-runtime/helpers/defineProperty");var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _FACTOR;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var depher = require("depher");
var harden = require("harden");
var raze = require("raze");
var shft = require("shft");

harden("KB_SIZE", "kb");
harden("MB_SIZE", "mb");
harden("GB_SIZE", "gb");



//: @client:
var DEFAULT_TOTAL_MEMORY = function () {
	/*;
                                        	@note:
                                        		These are just dummy values.
                                        	@end-note
                                        */

	if (window.performance && window.performance.memory) {
		return window.performance.memory.jsHeapSizeLimit;

	} else {
		return window.document.body.innerHTML.length * 100 * 100;
	}
}();
//: @end-client

var KB_SIZE_FACTOR = 1000;
var MB_SIZE_FACTOR = 1000000;
var GB_SIZE_FACTOR = 1000000000;

var FACTOR = (_FACTOR = {}, (0, _defineProperty3.default)(_FACTOR,
KB_SIZE, KB_SIZE_FACTOR), (0, _defineProperty3.default)(_FACTOR,
MB_SIZE, MB_SIZE_FACTOR), (0, _defineProperty3.default)(_FACTOR,
GB_SIZE, GB_SIZE_FACTOR), _FACTOR);


var power = Math.pow;

var memco = function memco(partition, scale, size, memory) {
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

	var parameter = raze(arguments);

	var condition = function condition(parameter) {return typeof parameter == "number" && parameter >= 1 && parameter <= 10;};
	partition = depher(parameter, condition, 2);
	scale = depher(shft(parameter), condition, 1);

	size = depher(parameter, [KB_SIZE, MB_SIZE, GB_SIZE], MB_SIZE);

	memory = depher(parameter, function (parameter) {return typeof parameter == "number" && parameter > 10;}, DEFAULT_TOTAL_MEMORY);

	var factor = FACTOR[size];

	return function (memory) {
		var factor = 2;

		while (power(2, ++factor) < memory) {}

		return power(2, factor - 1);
	}(memory / factor * scale / partition);
};

module.exports = memco;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWNvLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiZGVwaGVyIiwicmVxdWlyZSIsImhhcmRlbiIsInJhemUiLCJzaGZ0IiwiREVGQVVMVF9UT1RBTF9NRU1PUlkiLCJ3aW5kb3ciLCJwZXJmb3JtYW5jZSIsIm1lbW9yeSIsImpzSGVhcFNpemVMaW1pdCIsImRvY3VtZW50IiwiYm9keSIsImlubmVySFRNTCIsImxlbmd0aCIsIktCX1NJWkVfRkFDVE9SIiwiTUJfU0laRV9GQUNUT1IiLCJHQl9TSVpFX0ZBQ1RPUiIsIkZBQ1RPUiIsIktCX1NJWkUiLCJNQl9TSVpFIiwiR0JfU0laRSIsInBvd2VyIiwiTWF0aCIsInBvdyIsIm1lbWNvIiwicGFydGl0aW9uIiwic2NhbGUiLCJzaXplIiwicGFyYW1ldGVyIiwiYXJndW1lbnRzIiwiY29uZGl0aW9uIiwiZmFjdG9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtFQSxJQUFNQSxTQUFTQyxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1DLFNBQVNELFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUUsT0FBT0YsUUFBUyxNQUFULENBQWI7QUFDQSxJQUFNRyxPQUFPSCxRQUFTLE1BQVQsQ0FBYjs7QUFFQUMsT0FBUSxTQUFSLEVBQW1CLElBQW5CO0FBQ0FBLE9BQVEsU0FBUixFQUFtQixJQUFuQjtBQUNBQSxPQUFRLFNBQVIsRUFBbUIsSUFBbkI7Ozs7QUFJQTtBQUNBLElBQU1HLHVCQUF5QixZQUFPO0FBQ3JDOzs7Ozs7QUFNQSxLQUFJQyxPQUFPQyxXQUFQLElBQXNCRCxPQUFPQyxXQUFQLENBQW1CQyxNQUE3QyxFQUFxRDtBQUNwRCxTQUFPRixPQUFPQyxXQUFQLENBQW1CQyxNQUFuQixDQUEwQkMsZUFBakM7O0FBRUEsRUFIRCxNQUdLO0FBQ0osU0FBT0gsT0FBT0ksUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJDLFNBQXJCLENBQStCQyxNQUEvQixHQUF3QyxHQUF4QyxHQUE4QyxHQUFyRDtBQUNBO0FBQ0QsQ0FiNEIsRUFBN0I7QUFjQTs7QUFFQSxJQUFNQyxpQkFBaUIsSUFBdkI7QUFDQSxJQUFNQyxpQkFBaUIsT0FBdkI7QUFDQSxJQUFNQyxpQkFBaUIsVUFBdkI7O0FBRUEsSUFBTUM7QUFDSEMsT0FERyxFQUNRSixjQURSO0FBRUhLLE9BRkcsRUFFUUosY0FGUjtBQUdISyxPQUhHLEVBR1FKLGNBSFIsV0FBTjs7O0FBTUEsSUFBTUssUUFBUUMsS0FBS0MsR0FBbkI7O0FBRUEsSUFBTUMsUUFBUSxTQUFTQSxLQUFULENBQWdCQyxTQUFoQixFQUEyQkMsS0FBM0IsRUFBa0NDLElBQWxDLEVBQXdDbkIsTUFBeEMsRUFBZ0Q7QUFDN0Q7Ozs7Ozs7Ozs7O0FBV0EsS0FBSW9CLFlBQVl6QixLQUFNMEIsU0FBTixDQUFoQjs7QUFFQSxLQUFJQyxZQUFZLFNBQVpBLFNBQVksQ0FBRUYsU0FBRixVQUFtQixPQUFPQSxTQUFQLElBQW9CLFFBQXBCLElBQWdDQSxhQUFhLENBQTdDLElBQWtEQSxhQUFhLEVBQWxGLEVBQWhCO0FBQ0FILGFBQVl6QixPQUFRNEIsU0FBUixFQUFtQkUsU0FBbkIsRUFBOEIsQ0FBOUIsQ0FBWjtBQUNBSixTQUFRMUIsT0FBUUksS0FBTXdCLFNBQU4sQ0FBUixFQUEyQkUsU0FBM0IsRUFBc0MsQ0FBdEMsQ0FBUjs7QUFFQUgsUUFBTzNCLE9BQVE0QixTQUFSLEVBQW1CLENBQUVWLE9BQUYsRUFBV0MsT0FBWCxFQUFvQkMsT0FBcEIsQ0FBbkIsRUFBa0RELE9BQWxELENBQVA7O0FBRUFYLFVBQVNSLE9BQVE0QixTQUFSLEVBQW1CLFVBQUVBLFNBQUYsVUFBbUIsT0FBT0EsU0FBUCxJQUFvQixRQUFwQixJQUFnQ0EsWUFBWSxFQUEvRCxFQUFuQixFQUF3RnZCLG9CQUF4RixDQUFUOztBQUVBLEtBQUkwQixTQUFTZCxPQUFRVSxJQUFSLENBQWI7O0FBRUEsUUFBUyxVQUFFbkIsTUFBRixFQUFjO0FBQ3RCLE1BQUl1QixTQUFTLENBQWI7O0FBRUEsU0FBT1YsTUFBTyxDQUFQLEVBQVUsRUFBRVUsTUFBWixJQUF1QnZCLE1BQTlCOztBQUVBLFNBQU9hLE1BQU8sQ0FBUCxFQUFVVSxTQUFTLENBQW5CLENBQVA7QUFDQSxFQU5NLENBTUV2QixTQUFTdUIsTUFBWCxHQUFzQkwsS0FBeEIsR0FBa0NELFNBTmhDLENBQVA7QUFPQSxDQS9CRDs7QUFpQ0FPLE9BQU9DLE9BQVAsR0FBaUJULEtBQWpCIiwiZmlsZSI6Im1lbWNvLnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcIm1lbWNvXCIsXG5cdFx0XHRcInBhdGhcIjogXCJtZW1jby9tZW1jby5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwibWVtY28uanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwibWVtY29cIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL21lbWNvLmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwibWVtY28tdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRTcGVjaWZpYyBtZW1vcnkgY29tcHV0YXRpb24uXG5cblx0XHRUaGlzIHdpbGwgdXNlIGBvcy50b3RhbG1lbSggKWAgZm9yIHNlcnZlciBzaWRlIGRlZmF1bHQgbWF4aW11bSBtZW1vcnkuXG5cblx0XHRUaGlzIHdpbGwgdHJ5IHRvIHBhcnRpdGlvbiB0aGUgbWVtb3J5IGJhc2VkIG9uIHRoZSBwYXJ0aXRpb24gYW5kIHNjYWxlIGdpdmVuLlxuXG5cdFx0TWF4aW11bSBtZW1vcnkgc2hvdWxkIGJlIGdpdmVuIGluIGJ5dGVzLlxuXG5cdFx0UGFydGl0aW9uIGFuZCBzY2FsZSB2YWx1ZSBzaG91bGQgYmUgYmV0d2VlbiAxIHRvIDEwIGluY2x1c2l2ZS5cblx0XHREZWZhdWx0IHBhcnRpdGlvbiBvZiAyIGFuZCBzY2FsZSBvZiAxLlxuXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImRlcGhlclwiOiBcImRlcGhlclwiLFxuXHRcdFx0XCJoYXJkZW5cIjogXCJoYXJkZW5cIixcblx0XHRcdFwib3NcIjogXCJvc1wiLFxuXHRcdFx0XCJyYXplXCI6IFwicmF6ZVwiLFxuXHRcdFx0XCJzaGZ0XCI6IFwic2hmdFwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGRlcGhlciA9IHJlcXVpcmUoIFwiZGVwaGVyXCIgKTtcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcbmNvbnN0IHJhemUgPSByZXF1aXJlKCBcInJhemVcIiApO1xuY29uc3Qgc2hmdCA9IHJlcXVpcmUoIFwic2hmdFwiICk7XG5cbmhhcmRlbiggXCJLQl9TSVpFXCIsIFwia2JcIiApO1xuaGFyZGVuKCBcIk1CX1NJWkVcIiwgXCJtYlwiICk7XG5oYXJkZW4oIFwiR0JfU0laRVwiLCBcImdiXCIgKTtcblxuXG5cbi8vOiBAY2xpZW50OlxuY29uc3QgREVGQVVMVF9UT1RBTF9NRU1PUlkgPSAoICggKSA9PiB7XG5cdC8qO1xuXHRcdEBub3RlOlxuXHRcdFx0VGhlc2UgYXJlIGp1c3QgZHVtbXkgdmFsdWVzLlxuXHRcdEBlbmQtbm90ZVxuXHQqL1xuXG5cdGlmKCB3aW5kb3cucGVyZm9ybWFuY2UgJiYgd2luZG93LnBlcmZvcm1hbmNlLm1lbW9yeSApe1xuXHRcdHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2UubWVtb3J5LmpzSGVhcFNpemVMaW1pdDtcblxuXHR9ZWxzZXtcblx0XHRyZXR1cm4gd2luZG93LmRvY3VtZW50LmJvZHkuaW5uZXJIVE1MLmxlbmd0aCAqIDEwMCAqIDEwMDtcblx0fVxufSApKCApO1xuLy86IEBlbmQtY2xpZW50XG5cbmNvbnN0IEtCX1NJWkVfRkFDVE9SID0gMTAwMDtcbmNvbnN0IE1CX1NJWkVfRkFDVE9SID0gMTAwMDAwMDtcbmNvbnN0IEdCX1NJWkVfRkFDVE9SID0gMTAwMDAwMDAwMDtcblxuY29uc3QgRkFDVE9SID0ge1xuXHRbIEtCX1NJWkUgXTogS0JfU0laRV9GQUNUT1IsXG5cdFsgTUJfU0laRSBdOiBNQl9TSVpFX0ZBQ1RPUixcblx0WyBHQl9TSVpFIF06IEdCX1NJWkVfRkFDVE9SXG59O1xuXG5jb25zdCBwb3dlciA9IE1hdGgucG93O1xuXG5jb25zdCBtZW1jbyA9IGZ1bmN0aW9uIG1lbWNvKCBwYXJ0aXRpb24sIHNjYWxlLCBzaXplLCBtZW1vcnkgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJwYXJ0aXRpb246cmVxdWlyZWRcIjogXCJudW1iZXJcIixcblx0XHRcdFx0XCJzY2FsZVwiOiBcIm51bWJlclwiLFxuXHRcdFx0XHRcInNpemVcIjogXCJzdHJpbmdcIixcblx0XHRcdFx0XCJtZW1vcnlcIjogXCJudW1iZXJcIlxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0bGV0IHBhcmFtZXRlciA9IHJhemUoIGFyZ3VtZW50cyApO1xuXG5cdGxldCBjb25kaXRpb24gPSAoIHBhcmFtZXRlciApID0+ICggdHlwZW9mIHBhcmFtZXRlciA9PSBcIm51bWJlclwiICYmIHBhcmFtZXRlciA+PSAxICYmIHBhcmFtZXRlciA8PSAxMCApO1xuXHRwYXJ0aXRpb24gPSBkZXBoZXIoIHBhcmFtZXRlciwgY29uZGl0aW9uLCAyICk7XG5cdHNjYWxlID0gZGVwaGVyKCBzaGZ0KCBwYXJhbWV0ZXIgKSwgY29uZGl0aW9uLCAxICk7XG5cblx0c2l6ZSA9IGRlcGhlciggcGFyYW1ldGVyLCBbIEtCX1NJWkUsIE1CX1NJWkUsIEdCX1NJWkUgXSwgTUJfU0laRSApO1xuXG5cdG1lbW9yeSA9IGRlcGhlciggcGFyYW1ldGVyLCAoIHBhcmFtZXRlciApID0+ICggdHlwZW9mIHBhcmFtZXRlciA9PSBcIm51bWJlclwiICYmIHBhcmFtZXRlciA+IDEwICksIERFRkFVTFRfVE9UQUxfTUVNT1JZICk7XG5cblx0bGV0IGZhY3RvciA9IEZBQ1RPUlsgc2l6ZSBdO1xuXG5cdHJldHVybiAoICggbWVtb3J5ICkgPT4ge1xuXHRcdGxldCBmYWN0b3IgPSAyO1xuXG5cdFx0d2hpbGUoIHBvd2VyKCAyLCArK2ZhY3RvciApIDwgbWVtb3J5ICk7XG5cblx0XHRyZXR1cm4gcG93ZXIoIDIsIGZhY3RvciAtIDEgKTtcblx0fSApKCAoICggbWVtb3J5IC8gZmFjdG9yICkgKiBzY2FsZSApIC8gcGFydGl0aW9uICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbWNvO1xuIl19
//# sourceMappingURL=memco.support.js.map
