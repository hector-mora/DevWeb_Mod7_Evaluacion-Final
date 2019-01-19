const mongoose = require('mongoose'),
      autoIncrement = require('mongoose-auto-increment');
const Usuario = require('./modelUsuario.js');


connection = mongoose.createConnection('mongodb://localhost/calendario', { useNewUrlParser: true });

const Schema = mongoose.Schema;

let EventSchema = new Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  allDay: { type: Boolean, required: true },
  user: { type: Schema.ObjectId, ref: "usuarios" }
});

autoIncrement.initialize(connection)
EventSchema.plugin(autoIncrement.plugin, {model: 'eventos', startAt: 1} );

let EventModel = mongoose.model('eventos', EventSchema);

module.exports = EventModel;
