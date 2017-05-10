(function(){
	'use strict';

	var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.router']);

	myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/flags');

		$stateProvider
			.state('flags', {
				url:"/flags",
				views: {
					"@": { templateUrl: '../static/partials/flags.html', controller: 'FlagViewCtrl', controllerAs: "vm" },
				}
			});
	    }]);
})();


