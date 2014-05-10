var	timeComponent = require('./timecomponent.js'),
Project 	  	= require('./data.js'),
express		= require('express'),
app 		= express();

app.use(require('body-parser')()); 		// extrait les information de la requête pour POST et PUT
app.use(require('method-override')()); 	// simule PUT et DELETE
app.use(express.static(__dirname + '/public'));

app.get('/api/projects', function(req, res){
	returnAll(res);
});

function returnAll(res){
	Project.find(function(err, result) {
		if (err)
			res.send(err);
		res.json(result);
	});
}

//Start a project
app.get('/api/projects/start/:id_project', function(req, res){
	Project.findOne({_id  : req.params.id_project}, function (err, result) {
		if(!result.active)
			Project.update(
			{ _id : req.params.id_project },
			{ active: true, start_date: Date() },
			function() {
				if (err)
					res.send(err);
				returnAll(res);
			}
		);
		else
			returnAll(res);
	});
});

//Stop a project
app.get('/api/projects/stop/:id_project', function(req, res){
	Project.findOne({_id  : req.params.id_project}, function (err, result) {
		if(result.active)
			Project.update(
			{ _id : req.params.id_project },
			{ active: false, seconds: timeComponent.timeFromNow(result.start_date, result.seconds) },
			function(err, numberAffected) {
				if (err)
					res.send(err);
				returnAll(res);
			}
		);
		else
			returnAll(res);
	});
});

//POST new project
app.post('/api/projects', function(req, res){
	Project.create({
		name         		: req.body.name,
		description  	: req.body.description,
		estimed_time 	: req.body.estimed_time
	}, function(err, project) {
		if (err)
			res.send(err);
		returnAll(res);
	});
});

//PUT, edit project
app.put('/api/projects/:id_project', function(req, res){
	Project.update(
		{
			_id : req.params.id_project
		},
		{
			name			: req.body.name,
			description  	: req.body.description,
			estimed_time 	: req.body.estimed_time
		},
		function(err, project) {
			if (err){
				console.log(err);
				res.send(err);
			}
			returnAll(res);
		}
	);
});

//Delete all projects
app.delete('/api/projects/all', function(req, res){
	Project.remove({}, function (err, result) {
		if (err)
		res.send(err);
		returnAll(res);
	});
});

//Delete specific project
app.delete('/api/projects/:id_project', function(req, res){
	Project.remove({_id: req.params.id_project}, function (err, result) {
		if (err)
		res.send(err);
		returnAll(res);
	});
});

//Everything else, redirect to index.html
app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.listen(4000);