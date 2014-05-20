var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/test' );

var Schema = mongoose.Schema;

var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Projects = new Schema({
	name         	: { type: String, default: "New project" },
	description		: { type: String, default: "Description of the new project" },
	active			: { type: Boolean, default: false },
	steps 	 		: [{ type: Schema.Types.ObjectId, ref: 'steps' }],
	buff 			: Buffer,
});

var Steps = new Schema({
	_project 		: { type: Schema.Types.ObjectId, ref: 'projects' },
	name         	: { type: String, default: "New step" },
	description		: { type: String, default: "Description of the step" },
	estimed_time 	: { type: Number, default: 1 },
	seconds			: { type: Number, default: 0 },
	active			: { type: Boolean, default: false },
	start_date 		: { type: Date, default: Date() },
	buff 			: Buffer
});

var models = {
	projects: mongoose.model('projects', Projects),
	steps: mongoose.model('steps', Steps)
}

module.exports = models;
