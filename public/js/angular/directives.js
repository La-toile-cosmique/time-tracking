timeTrackingDirectives = angular.module('timeTrackingDirectives', [])
.directive('csTime', ['secondsToTimeFilter', '$interval', function(secondsToTimeFilter, $interval) {
	function linker(scope, element, attrs) {
		var seconds, 
			timeoutId;
		seconds = scope.project.totalTime;
		function updateTime() {
			element.text(secondsToTimeFilter(seconds) + ' ' + scope.project.estimed_time + 'h');
		}
		scope.$watch('project.active', function(value) {
			if(value)
				startTimer();
			else
				stopTimer();
		});
		function startTimer(){
		    timeoutId = $interval(function() {
		    	seconds ++;
	      		updateTime();
		  	}, 1000);
		}
		function stopTimer(){
			$interval.cancel(timeoutId);
		}
		updateTime();
		element.on('$destroy', function() {
			stopTimer();
		});
	}
	return {
		link : linker
	}
}]) 
.directive('csPctTime', ['pctTimeFilter', '$interval', function(pctTimeFilter, $interval) {
		function linker(scope, element, attrs) {
			var timeoutId,
				seconds;
			seconds = scope.project.totalTime;
			scope.$watch('project.active', function(value) {
				if(value)
					startTimer();
				else
					stopTimer();
			});
			function updateTime() {
				scope.pct = pctTimeFilter(seconds, scope.project.estimed_time);
			}
			function startTimer(){
				timeoutId = $interval(function() {
					seconds += 60;
					updateTime();
				}, 60000);
			}
			function stopTimer(){
				$interval.cancel(timeoutId);
			}
			element.on('$destroy', function() {
				stopTimer();
			});
			updateTime();
		}
		return {
			link : linker,
			templateUrl: 'directive/pct-time.html'
		};
	}
]);
