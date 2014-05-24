timeTrackingDirectives = angular.module('timeTrackingDirectives', [])

.directive('mytruc',

	['secondsToTimeFilter', 'pctTimeFilter', 'csTimeFilter', 'pctTimeFilter', 'secondsToTimeFilter', '$interval',

		function(secondsToTimeFilter, pctTimeFilter, csTimeFilter, pctTimeFilter, secondsToTimeFilter, $interval) {

			function linker(scope, element, attrs) {

				var timeoutId,
					totaltime,
					date 			= scope.step.start_date,
					active 			= scope.step.active,
					seconds 		= scope.step.seconds,
					estimed_time 	= scope.step.estimed_time;


				if(active) // if the step is active, the filter return of seconds since date + seconds
					totaltime = csTimeFilter(date, seconds);
				else
					totaltime = seconds;

				/**
				 * Update time visualization in pct and in text  
				 * @return void
				 */
				function updateTime() {
					scope.step.pct = pctTimeFilter(totaltime, scope.step.estimed_time);
					element.text(secondsToTimeFilter(totaltime) + ' sur ' + scope.step.estimed_time + 'h');
				}

				/**
				 * Watch active step
				 */
				scope.$watch('step.active', function(value) {
					if(value)
						startTimer();
					else
						stopTimer();
				});

				/**
				 * Update Time every seconds
				 */
				function startTimer(){
				    timeoutId = $interval(function() {
				    	totaltime ++;
			      		updateTime();
				  	}, 1000);
				}

				/**
				 * Stop timer
				 * @return {[type]} [description]
				 */
				function stopTimer(){
					$interval.cancel(timeoutId);
				}

				/**
				 * Stop timer on destroy, if not called, 
				 * timer just continue in background
				 */
				element.on('$destroy', function() {
					stopTimer();
				});

				updateTime(); //First call

				scope.updateTime = function(){ // Used to manually refresh time form controller
					updateTime();
				}

			}

			return {
				link : linker
			};
		}
	]
);
