var	timeComponent 	= require( './timecomponent.js' ),
	Data 	  		= require( './data.js' ),
	express			= require( 'express' ),
	app 			= express();

app.use( require( 'body-parser' )() );
app.use( require( 'method-override' )() );
app.use( express.static( __dirname + '/public' ));

app.get( '/api/projects', function( req, res ){
	returnAll( res );
});

function returnAll( res ){
	Data.projects
		.find()
		.populate('steps')
		.exec(function ( err, result ) {

			if ( err )
				res.send( err );
			res.json( result );
		});
}

//Add a step
app.post('/api/steps/:id_project', function(req, res){

	Data.projects;
	Data.steps;

	Data.steps.create(

		{
			name         	: req.body.name,
			description  	: req.body.description,
			estimed_time	: req.body.estimed_time,
			_project		: req.params.id_project
		},

		function(err, step) {

			if ( err )
				res.send( err );

			Data.projects.findById(req.params.id_project, function (err, project) {

				project.steps.push(step);
				project.save(function (err) {

					returnAll( res );
				});
			});
		}
	);
});

//Delete a step
app.delete('/api/steps/:id_step', function(req, res){

	Data.steps.findOne( { _id  : req.params.id_step }, function ( err, step ){

		if ( err )
			res.send( err );

		Data.projects.findById(step._project, function ( err, project ) {

			if (err) return handleError(err);

			var index = project.steps.indexOf(step._id);

			if (index > -1) {
				project.steps.splice(index, 1);
			}

			project.save(function (err) {

				if ( err )
					res.send( err );

				Data.steps.remove({ _id: req.params.id_step }, function (err) {

					if ( err )
						res.send( err );

					returnAll( res );

				});
			});
		});
	});
});


//Start a step
app.get('/api/steps/start/:id_step', function(req, res){

	Data.steps.findOne( { _id  : req.params.id_step }, function ( err, step ){

		if( !step.active )
			Data.steps.update(

				{ _id : req.params.id_step },
				{ active: true, start_date: Date() },

				function() {
					if ( err )
						res.send( err );
					returnAll( res );
				}

			);

		else
			returnAll( res );
	});
});

//Stop step
app.get('/api/steps/stop/:id_step', function(req, res){

	Data.steps.findOne( { _id  : req.params.id_step }, function ( err, step ){

		if( step.active )
			Data.steps.update(

				{ _id : req.params.id_step },

				{
					active	: false,
				  	seconds	: timeComponent.timeFromNow( step.start_date, step.seconds )
				},

				function() {
					if ( err )
						res.send( err );
					returnAll( res );
				}

			);

		else
			returnAll( res );
	});
});


//Stop a project
/*app.get( '/api/projects/stop/:id_project', function( req, res ){
	Data.projects.findOne( { _id  : req.params.id_project }, function ( err, result ) {
		if( result.active )
			Data.projects.update(
			{ _id : req.params.id_project },
			{ active: false, seconds: timeComponent.timeFromNow( result.start_date, result.seconds ) },
			function( err, numberAffected ) {
				if ( err )
					res.send( err );
				returnAll( res );
			}
		);
		else
			returnAll( res );
	});
});*/

//POST new project
app.post( '/api/projects', function( req, res ){

	Data.projects.create({

		name         	: req.body.name,
		description  	: req.body.description

	}, function( err, project ) {

		if ( err )
			res.send( err );
		returnAll( res );

	});

});

//PUT, edit project
app.put( '/api/projects/:id_project', function( req, res ){

	Data.projects.update(

		{ _id : req.params.id_project },

		{
			name			: req.body.name,
			description  	: req.body.description
		},

		function( err, project ) {
			if ( err )
				res.send( err );
			returnAll( res );
		}

	);
});

//Delete all projects
app.delete( '/api/projects/all', function( req, res ){

	Data.projects.remove( {}, function ( err, result ) {
		if ( err )
			res.send( err );
		returnAll( res );
	});

});

//Delete specific project
app.delete( '/api/projects/:id_project', function( req, res ){

	Data.projects.remove( { _id: req.params.id_project }, function ( err, result ) {
		if ( err )
			res.send( err );
		returnAll( res );
	});

});

//Everything else, redirect to index.html
app.get('*', function( req, res ) {

	res.sendfile( './public/index.html' );
});

app.listen( 4000 );


var util = require('util'),
    exec = require('child_process').exec,
    child;

child = exec('gulp', // command line argument directly in string
function (error, stdout, stderr) {      // one easy function to capture data/errors
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});









