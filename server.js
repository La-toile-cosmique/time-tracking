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

/*					console.log(step);
					console.log(err);*/

					console.log(project);
					console.log('coucou');

					returnAll( res );

				});

			});

		}

	);

});


/*//Start a project
app.get('/api/projects/start/:id_project', function(req, res){
	Data.projects.findOne( { _id  : req.params.id_project }, function ( err, result ){
		if( !result.active )
			Data.projects.update(
			{ _id : req.params.id_project },
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
*/
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












