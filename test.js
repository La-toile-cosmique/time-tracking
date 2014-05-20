var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/test' );

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	  name    : String
	, age     : Number
	, stories : [{ type: Schema.ObjectId, ref: 'Step' }]
});

var StepSchema = new Schema({
	  _creator : { type: Schema.ObjectId, ref: 'Project' }
	, title    : String
});

var models = {
	steps: mongoose.model('Step', StepSchema),
	projects: mongoose.model('Project', ProjectSchema)
}

models.steps.remove({}, function(){

	models.projects.remove({}, function(){

		var a = new models.projects({name: 'PornLove', age: 59});

		a.save(function (err) {
			if (err) return console.log(err);

			var step1 = new models.steps({
				title: "A fuck for you"
				, _creator: a._id
			});			

			var step2 = new models.steps({
				title: "A big little man"
				, _creator: a._id
			});

			step1.save(function (err) {

				a.stories.push(step1);
				a.save(function(){

					models.projects
						.find()
						.populate('stories') 
						.exec(function (err, result){
							console.log('*********** projects *********** \n' + result);
						});

					models.steps
						.find()
						.exec(function (err, result){
							console.log('*********** steps *********** \n' + result);
						});

				});

			});

		});

	});

});



