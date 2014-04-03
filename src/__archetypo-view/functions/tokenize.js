/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	/**
	 * Converts a str to camelCase
	 *
	 * @method camelCase
	 * @param str
	 */
	function camelCase(str) {
		return str.replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function(all, letter) {
			return (letter + "").toUpperCase();
		});
	}


	var splitter = /\s+/;

	/**
	 * Converts a string into an array.
	 *
	 * @method tokenize
	 * @param str
	 */
	module.exports = function tokenize(str) {
		if (!_.isString(str)) {
			return [];
		}

		var data = str.split(splitter);

		return _(data).map(camelCase).compact().value();
	};
});
