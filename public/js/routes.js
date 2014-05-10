var timeTrackingRoutes = angular.module('timeTrackingRoutes', ['ngRoute']);
timeTrackingRoutes.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/welcome', {
		templateUrl: 'partial/welcome.html'
	}).
	when('/projects/add', {
		templateUrl: 'partial/add.html',
		controller: 'AddProjectController'
	}).	
	when('/projects/:projectId', {
		templateUrl: 'partial/detail.html',
		controller: 'DetailProjectController'
	}).
	otherwise({
		redirectTo: '/welcome'
	});
}]);
