timeTrackingFilters = angular.module( 'timeTrackingFilters', [ ] )

// Seconds to time
.filter( 'secondsToTime', function( ) {
	return function( seconds ) {
		var minutes = Math.floor( seconds / 60 );
		var hours = Math.floor( minutes / 60 );
		minutes -= ( hours * 60 );
		return ( hours ) ? hours + 'h ' + minutes + 'm' : minutes + 'm';
	}})

// Total time
.filter( 'csTime', function( ) {
	return function ( date, seconds ){
		var now = new Date( ),
		start = new Date( date );
		return Math.round( ( now.getTime( ) - start.getTime())/1000) + parseInt( seconds );
	}})

// Time spent in percent
.filter( 'pctTime', function() {
	return function ( seconds, total_hours ){
		return Math.min( 100, Math.round( ( seconds / ( total_hours * 60 * 60 ) ) * 100 ) );
	}})

