/**
 * @module archetypo-view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		backbone = require('lowercase-backbone'),
		q = require('q');

	module.exports = backbone.view.extend({

		initialize: function initialize(options) {
			backbone.view.prototype.initialize.call(this, options);
			this.initializeArchetypoView(options);
		},

		/**
		 * The view builder. It is basically a Backbone.View
		 *
		 * @class view
		 * @constructor
		 * @param options {Object}
		 */
		initializeArchetypoView: function initializeArchetypoView(options) {

			options = options || {};

			// save reference to app.
			this.app = options.app;

			// [1] Templating and replacement
			// If there is an 'html' property
			// build up an element with it place it within $el.
			// render is ASYNC
			var render = this.render(options);

			// [2] Register view (synchornously)
			this.register(options);

			// [3] render and build up subviews
			if (q.isPromise(render)) {

				// if this.render returns a promise,
				// wait for it to be resolved.

				render.then(_.partial(_.bind(this.build, this), options));

			} else {
				// if it returns anything else (including undefined)
				// just run the building straight away.

				this.build(options);
			}
		},

		register: require('./__archetypo-view/methods/register'),
		render: require('./__archetypo-view/methods/render'),
		build: require('./__archetypo-view/methods/build-sub-views'),

		/**
		 * Selects the view objcets that descend from this view.
		 *
		 * @method subviews
		 * @param selector {Object|[String]}
		 */
		subviews: function subviews(selector) {
			if (_.isString(selector)) {
				// single, by id
				return this.registry.descendantItems({ id: selector }).take(1).toArray()[0];
			} else {
				// multiple
				return this.registry.descendantItems(selector);
			}
		},
	});
});
