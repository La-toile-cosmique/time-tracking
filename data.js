var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/test' );

var Schema = mongoose.Schema;

var Projects = new Schema({
	name         	: { type: String, default: "New project" },
	description		: { type: String, default: "Description of the new project" },
	estimed_time 	: { type: Number, default: 1 },
	seconds			: { type: Number, default: 0 },
	active			: { type: Boolean, default: false },
	start_date 		: { type: Date, default: Date() },
	steps  			: [Steps],
	buff 			: Buffer
});

var Steps = new Schema({
	name         	: { type: String, default: "New step" },
	description		: { type: String, default: "Description of the step" },
	estimed_time 	: { type: Number, default: 1 },
	seconds			: { type: Number, default: 0 },
	active			: { type: Boolean, default: false },
	start_date 		: { type: Date, default: Date() },
	buff 			: Buffer
});

module.exports =  mongoose.model( 'projects', Projects );






