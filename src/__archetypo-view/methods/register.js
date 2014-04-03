/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var Registry = require('../objects/registry'),
		tokenize = require('../functions/tokenize');

	module.exports = function register(options) {
		//>>excludeStart("exclude", pragmas.exclude);
		console.log('register')
		//>>excludeEnd("exclude");

		options = options || {};

		// [1] retrieve data that will identify this view
		var data = this.$el.data() || {};
		// get the id of the $el.
	//	data.id = data.id || this.$el.prop('id') || this.cid || _.uniqueId('view');
		// set _id (which is the idAttribute of the registry)
	//	data._id = data.id + options.builder;
		// builder name
		data.builder = options.builder;
		// item
		data.item = this;
		// tokenize class
		data['class'] = tokenize(data['class']);

		// [2] ancestor
		this.ancestor = options.ancestor || false;

		// [2] get registry object
		if (this.ancestor) {
			this.registry = this.ancestor.registry.addBranch(data);
		} else {
			this.registry = new Registry(data);
		}
	};

});
