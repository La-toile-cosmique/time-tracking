timeTrackingControllers = angular.module('timeTrackingControllers', [])

// Alerts Controller
.controller('AlertsController', ['$scope', 'Alert', function( $scope, Alert ){
	$scope.alert = Alert.message;
		$scope.$watch(
			function () {
				return Alert.message;
			},
			function ( message ) {
				$scope.alert = message;
			}
		);
}])

// List All Projets
.controller( 'ListProjectsController', ['$scope', 'projectsData', 'REST', function($scope, projectsData, REST){
	projectsData.set( REST.query( ) );
	$scope.iconClass = function(active){
		if(active)
			return 'glyphicon glyphicon-play';
		else
			return 'glyphicon glyphicon-stop';
	};
	$scope.$watch(
		function () {
			return projectsData.get();
		},
		function ( projects ) {
			$scope.projects = projects;
		}
	);
}])

// Add Controller
.controller(
	'AddProjectController',
	['$scope', 'Alert', 'projectsData', '$resource', 'REST',
	function($scope, Alert, projectsData, $resource, REST){

		$scope.createProject = function(){

			projects = REST.post( $scope.createForm, function(){

				projectsData.set( projects );
				$scope.createForm = {};
				Alert.addAlert( 'Projet ajouté' );

			});

		};

	}])

// Detail Controller
.controller(
	'DetailProjectController',
	['Alert', '$scope', '$resource', 'REST', 'REST2', '$routeParams', 'csTimeFilter', '$filter', 'projectsData', '$location',
	function(Alert, $scope, $resource, REST, REST2, $routeParams, csTimeFilter, $filter, projectsData, $location) {

		$scope.projects = projectsData.get();

		var search = $filter('filter')( $scope.projects, { _id: $routeParams.projectId }, true );

		if ( search.length )
			$scope.project = search[ 0 ];

		// Delete a project
		$scope.deleteProject = function( id_project ){

			projects = REST.delete( { first_param: $scope.project._id }, function() {

				projectsData.set( projects );
				$location.path( '/welcome/' );
				$location.replace( );

			});

		};

		$scope.editProject = function(){ $scope.editMode = true }

		// Edit a project
		$scope.updateData = function() {

			REST.update( {
				name: 			$scope.project.name,
				description: 	$scope.project.description,
				estimed_time: 	$scope.project.estimed_time,
				first_param: 	$scope.project._id
			} );

			Alert.addAlert( 'Projet modifié' );
			$timeout( function(){ Alert.clearAlert(); }, 5000);

			$scope.editMode = false;

		};

		$scope.createStep = function(){

			$scope.stepForm.first_param = $scope.project._id;

			projects = REST2.add( $scope.stepForm, function(){

				search = $filter('filter')( projects, { _id: $routeParams.projectId }, true );

				if ( search.length )
					$scope.project = search[ 0 ];

				projectsData.set( projects );

				$scope.stepForm = {};
				Alert.addAlert( 'Etape ajoutée' );

			});

		};

	}])


// Steps Controller
.controller(
	'StepsController',
	['Alert', '$scope', '$resource', 'REST', 'REST2', '$timeout', '$routeParams', 'csTimeFilter', '$filter', 'projectsData', '$location',
	function(Alert, $scope, $resource, REST, REST2, $timeout, $routeParams, csTimeFilter, $filter, projectsData, $location) {

		$scope.steps = $scope.project.steps;

		$scope.createStep = function(){

			$scope.stepForm.first_param = $scope.project._id;

			projects = REST2.add( $scope.stepForm, function(){

				projectsData.set( projects );

				$scope.stepForm = {};
				Alert.addAlert( 'Etape ajoutée' );

			});

		};


		$scope.deleteStep = function(id){

			console.log(id);


			projects = REST2.delete(
				{ first_param: id},
				function(){

/*					projectsData.set( projects );

					$scope.stepForm = {};
					Alert.addAlert( 'Etape ajoutée' );*/

				}
			);
		};

	}]);