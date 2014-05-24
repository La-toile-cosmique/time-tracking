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

	projectsData.set( REST.query() );

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

			$scope.$watch(
				function () {
					return projectsData.get();
				},
				function ( projects ) {
					$scope.projects = projects;
		    		var search = $filter('filter')( projects, { _id: $routeParams.projectId }, true );
					if ( search.length )
						$scope.project = search[ 0 ];
				}
			);
			
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

				$scope.editMode = false;

			};
		}
	]
)


// Steps Controller
.controller(
	'StepsController',
	['Alert', '$scope', '$resource', 'REST', 'REST2', '$timeout', '$routeParams', 'csTimeFilter', '$filter', 'projectsData', '$location',
	function(Alert, $scope, $resource, REST, REST2, $timeout, $routeParams, csTimeFilter, $filter, projectsData, $location) {

		$scope.showDetails = function( item ){

			if(item.details == true)
				item.details = false;
			else
				item.details = true;
		}

		$scope.editStep = function( item ){

			if (item.show == true) {

				projects = REST2.update(

				{
					first_param :  	item._id,
					name        : 	item.name,
					description	: 	item.description,
					seconds		: 	item.seconds,
					estimed_time: 	item.estimed_time
				},

				function(){ 

					projectsData.set( projects ) 

				});
			
				Alert.addAlert( 'Etape modifiée' );

			}

			else{

				item.show = true;

				REST2.stop( { second_param: item._id } );

			}
		}

		$scope.stateStep = function(id, active){

			if(active)
				projects = REST2.start({ second_param: id }, function(){ projectsData.set( projects ) });
			else
				projects = REST2.stop({ second_param: id }, function(){ projectsData.set( projects ) });

		};

		$scope.createStep = function(){

			$scope.stepForm.first_param = $scope.project._id;

			projects = REST2.add( $scope.stepForm, function(){

				//Pass new projects data to service
				projectsData.set( projects );

				//Empty the form and display alert
				$scope.stepForm = {};
				Alert.addAlert( 'Etape ajoutée' );

				$scope.adidou = false;

			});

		};


		$scope.deleteStep = function(id){

			projects = REST2.delete(

				{ first_param: id },

				function(){

					//Pass new projects data to service
					projectsData.set( projects );

					//Display alert
					Alert.addAlert( 'Etape supprimée' );

				}
			);
		};

		$scope.addmode = function(){

			if(!$scope.adidou) 
				$scope.adidou = true 
			else 
				$scope.adidou = false 
	}
}]);