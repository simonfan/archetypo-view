/**
 * @module archetypo
 * @submodule registry
 */

define('__archetypo-view/objects/registry',['require','exports','module','lodash','lowercase-backbone','backbone.model.tree'],function (require, exports, module) {
	

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

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo-view/functions/tokenize',['require','exports','module','lodash'],function (require, exports, module) {
	

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

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo-view/methods/register',['require','exports','module','lodash','../objects/registry','../functions/tokenize'],function (require, exports, module) {
	

	var _ = require('lodash');

	var Registry = require('../objects/registry'),
		tokenize = require('../functions/tokenize');

	module.exports = function register(options) {
		
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

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo-view/methods/render',['require','exports','module','lodash','q'],function (require, exports, module) {
	

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
			
			// async resolution

			// if a html data property is set on
			// the html element,
			// assume it is a module name.
			require(['text!' + htmlSource], _.bind(function (html) {

				this.$el.html(html);

				defer.resolve();

			}, this));

		} else {
			
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
		
		if (!this.renderPromise) {
			// render was not called yet,
			// so call it, set the promise and return

			this.renderPromise = _render.call(this, options);
		}

		// always return the promise.
		return this.renderPromise;
	}

});

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo-view/methods/build-sub-views',['require','exports','module','lodash','jquery','../functions/tokenize'],function (require, exports, module) {
	

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

/**
 * @module archetypo-view
 */

define('archetypo-view',['require','exports','module','lodash','lowercase-backbone','q','./__archetypo-view/methods/register','./__archetypo-view/methods/render','./__archetypo-view/methods/build-sub-views'],function (require, exports, module) {
	

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

