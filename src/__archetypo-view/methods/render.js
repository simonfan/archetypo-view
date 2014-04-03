/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');

	/**
	 * Does all the dirty stuff.
	 *
	 * @method _render
	 * @private
	 *
	 */
	function _render(options) {

		// create a deferred object
		var defer = q.defer();

		// [1] Templating and replacement
		// If there is an 'html' property
		// build up an element with it place it within $el.

		var htmlSource = this.$el.data('html');

		// [2] retrieve html
		if (htmlSource) {
			//>>excludeStart("exclude", pragmas.exclude);
			console.log('render async')
			//>>excludeEnd("exclude");

			// async resolution

			// if a html data property is set on
			// the html element,
			// assume it is a module name.
			require(['text!' + htmlSource], _.bind(function (html) {

				this.$el.html(html);

				defer.resolve();

			}, this));

		} else {
			//>>excludeStart("exclude", pragmas.exclude);
			console.log('render directly')
			//>>excludeEnd("exclude");

			// immediate resolution
			var html = options.html || this.html;

			if (html) {
				this.$el.html(html);
			}

			defer.resolve();
		}

		// return promise no matter what.
		return defer.promise;
	}



	/**
	 * Verifies for cached render call.
	 *
	 * @method render
	 * @param options
	 */
	module.exports = function render(options) {
		//>>excludeStart("exclude", pragmas.exclude);
		console.log('render')
		//>>excludeEnd("exclude");

		if (!this.renderPromise) {
			// render was not called yet,
			// so call it, set the promise and return

			this.renderPromise = _render.call(this, options);
		}

		// always return the promise.
		return this.renderPromise;
	}

});
