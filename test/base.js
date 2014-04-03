(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'archetypo-view',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(archetypoView, should) {
	'use strict';

	describe('archetypoView base', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function (done) {


			var bodyView = archetypoView.extend({

				initialize: function initialize(options) {
					this.initializeArchetypoView(options);

					options.el.append('body!');
				},

			});

			var navView = archetypoView.extend({
				initialize: function initialize(options) {
					this.initializeArchetypoView(options);

					options.el.append('[nav]');
				}
			});

			var inputBoxView = archetypoView.extend({
				initialize: function initialize(options) {
					this.initializeArchetypoView(options);

					options.el.append('input!!')
				}
			})


			var mockApp = {
				builders: {
					nav: navView,

					body: bodyView,

					inputBox: inputBoxView

				},

				builder: function (name) {
					return this.builders[name]
				},
			};


			var appView = archetypoView({
				app: mockApp,
				el: $('[data-builder="app"]')
			});




			setTimeout(function() {
				var inputViews = appView.subviews({
					builder: 'inputBox'
				})
				.toArray()
					.length
					.should.eql(4);

				var navAndBody = appView.subviews({
					builder: {
						$in: ['nav', 'body']
					}
				})
				.toArray()
				.length.should.eql(4)


				var navOnly = appView.subviews({
					builder: 'nav'
				})
				.toArray()
				.length.should.eql(3);

				done();
			}, 0);
		});
	});
});
