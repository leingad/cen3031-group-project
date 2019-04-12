/* Dependencies */
var Note = require("../models/note.model.js");

/* retrieve all notes */
exports.list = function(req, res) {
  res.json(req.notes);
};

/* Create a Note */
exports.create = function(req, res) {
  var note = new Note(req.body);

  /* save to mongoDB */
  note
    .save()
    .then(() => res.json(note))
    .catch(err => res.status(400).send(err));
};

/* Show the current note */
exports.read = function(req, res) {
  res.json(req.notes);
};

/* Update a note */
exports.update = function(req, res) {
  Note.findByIdAndUpdate(req.params, req.body)
    .then(updatedNote => res.json(updatedNote))
    .catch(err => res.status(400).send(err));
};

/* Delete a note */
exports.delete = function(req, res) {
  Note.findByIdAndRemove(req.params)
    .then(deletedNote => res.json(deletedNote))
    .catch(err => res.status(400).send(err));
};

/**
 * Middlware
 */

/* find all notes with a matching 'linkedId' */
exports.noteByLinkedId = function(req, res, next) {
  linkedId = req.query.linkedId;
  if (linkedId) {
    Note.find({ linkedId: linkedId }).exec()
      .then(notes => req.notes = notes)
      .catch(err => res.status(400).send(err))
  } else {
    Note.find({}).exec()
      .then(notes => req.notes = notes)
      .catch(err => res.status(400).send(err))
  }
  next();
};
