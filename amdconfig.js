require.config({
	urlArgs: 'bust=0.7912857758346945',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'archetypo-view': 'index',
		'backbone.collection.lazy': '../bower_components/backbone.collection.lazy/built/backbone.collection.lazy',
		'backbone.collection.queryable': '../bower_components/backbone.collection.queryable/built/backbone.collection.queryable',
		'backbone.model.tree': '../bower_components/backbone.model.tree/built/backbone.model.tree',
		backbone: '../bower_components/backbone/backbone',
		containers: '../bower_components/containers/built/containers',
		itr: '../bower_components/itr/built/itr',
		deep: '../bower_components/deep/built/deep',
		jquery: '../bower_components/jquery/dist/jquery',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		qunit: '../bower_components/qunit/qunit/qunit',
		'object-query': '../bower_components/object-query/built/object-query',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore',
		subject: '../bower_components/subject/built/subject',
		lazy: '../bower_components/lazy.js/lazy',
		q: '../bower_components/q/q'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		},
		lazy: {
			exports: 'Lazy'
		}
	}
});
