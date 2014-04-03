/**
 * @module archetypo
 * @submodule registry
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		backbone = require('lowercase-backbone'),
		Tree = require('backbone.model.tree');


	/**
	 * The registry is just a Bakbone.Model.Tree Object
	 * with some special methods to get the 'item' attributes
	 * from the branch models.
	 *
	 * @class registry
	 * @constructor
	 */
	var Registry = module.exports = Tree.extend({

		idAttribute: '_id',
		/**
		 * Selects the descending branch models and map
		 * the results to return directly the 'item' attribute.
		 *
		 * @method descendantItems
		 * @param criteria {Object}
		 */
		descendantItems: function descendantItems(criteria) {
			var descendants = this.selectDescendants(criteria);

			return descendants.map(function (desc) {
				return desc.get('item');
			});
		},
	})
});
