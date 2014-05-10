var timeComponent = {

	timeFromNow: function(date, seconds){
		var now = new Date(),
			start = new Date(date);
		return Math.round((now.getTime() - start.getTime())/1000) + parseInt(seconds);
	}

}

module.exports = timeComponent;