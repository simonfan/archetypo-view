/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');

	var tokenize = require('../functions/tokenize');

	/**
	 * Instantiates the subview.
	 *
	 * @method buildSubview
	 * @private
	 * @param el {Plain DOM Object}
	 */
	function buildSubview(app, el) {

			// wrap el in jqObject
		var $el = $(el);


		// retrieve the view names
		var builderNames = tokenize($el.data('builder'));

		// loop through each of the view names
		_.each(builderNames, function (builderName, index) {

			if (!$el.data('instantiated_' + builderName)) {
				var builder = app.builder(builderName);

				// set el and app on the data object.
				var options = {
					el: $el,
					ancestor: this,
					app: app,

					// set builder to exclusively builderName
					builder: builderName,
				};

				// instantiate the builder.
				builder(options);

				// set arch-instantiated to true
				$el.data('instantiated_' + builderName, true);
			}

		}, this);
	}



	/**
	 * Builds the subviews of this view.
	 *
	 *
	 * @method buildSubviews
	 * @param options
	 */
	module.exports = function buildSubviews(options) {
		//>>excludeStart("exclude", pragmas.exclude);
		console.log('build')
		//>>excludeEnd("exclude");

		var app = options.app;

		// [0] Sub-views
		// Look for child nodes that have an 'arch-view'
		// attribute defined and instantiate the corresponding view.

		// [1]
		// find all elements within this element
		// that have an 'arch-view' attribute defined.
		var $subs = this.$el.find('[data-builder]');

		// [2]
		// Instantiate the sub-views
		_.each($subs, function (el) {
			buildSubview.call(this, app, el);
		}, this);
	};

});
