var timeTrackingServices = angular.module( 'timeTrackingServices', [ 'ngResource' ] )

.factory('Alert', [ '$timeout', function( $timeout ) {
	return {
		message: false,
		addAlert: function( message ) {
			this.message = message;
			$timeout( function(){ this.clearAlert(); }, 5000);
		},
		clearAlert: function() {
			this.message = false;
		}
	};
}])

// Share data between controllers
.factory( "projectsData", function(){
	var projects = { data: "" };
	return {
		set: function ( data ) {
			projects.data = data;
		},
		get: function () {
			return projects.data;
		}
	};
})

.factory('REST', [ '$resource', function( $resource ) {
	return $resource('/api/projects/:first_param/:second_param', {},
		{
			delete:  	{ method: 'DELETE', isArray: true },
			query: 		{ method: 'GET', params: {}, isArray: true },
			post: 		{ method: 'POST', params: {}, isArray: true },
			update: 	{ method: 'PUT', params: { first_param: '@first_param' }, isArray: true }
		}
	);
}]);
