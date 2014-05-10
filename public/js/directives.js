timeTrackingDirectives = angular.module('timeTrackingDirectives', [])

.directive('totalTime', ['secondsToTimeFilter', 'pctTimeFilter', '$interval', function(secondsToTimeFilter, pctTimeFilter, $interval) {
	function linker(scope, element, attrs) {

		var timeoutId,
			ctx = document.getElementById( "myChart" ).getContext( "2d" ),
			chartOptions = { animation : false },
			myNewChart = new Chart( ctx ).Pie( { }, chartOptions ),
			seconds = scope.project.totalTime;

		function updateTime() {

			scope.displayTime = secondsToTimeFilter(seconds) + ' sur ' + scope.project.estimed_time + 'h';

			var pct = pctTimeFilter(seconds, scope.project.estimed_time);

			data = [{
				value:   pct,
				color:"#428bca"
			},
			{
				value : 100 - pct,
				color : "#eee"
			}];

			myNewChart = new Chart(ctx).Pie(data, chartOptions);

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
	};
}])
