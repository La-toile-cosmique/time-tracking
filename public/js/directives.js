timeTrackingDirectives = angular.module('timeTrackingDirectives', [])

.directive('mytruc',

	['secondsToTimeFilter', 'pctTimeFilter', 'csTimeFilter', 'pctTimeFilter', '$interval',

		function(secondsToTimeFilter, pctTimeFilter, csTimeFilter, pctTimeFilter, $interval) {

			function linker(scope, element, attrs) {

				var timeoutId,
					totaltime,
					date = scope.step.date,
					active = scope.step.active,
					seconds = scope.step.seconds;

				function updateTime() {

					if(active)
						totaltime = csTime(date, seconds);
					else
						totaltime = seconds;

					scope.step.pct = pctTimeFilter(totaltime, scope.step.estimed_time);

				}

				scope.$watch('step.active', function(value) {
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
		}
	]
);
