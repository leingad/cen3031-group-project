/* Import mongoose and define any variables needed to create the schema */
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/* Create your schema */
var recommendationSchema = new Schema({
  client: {
    type: String,
    required: true
  }, // will use key value associated with User, namely User.email
  title: {
    type: String,
    required: true
  },
  text: String,
  link: {
    type: String,
    validate: {
      validator: function(v) {
        /* TODO: find a better regex, this one doesnt work with e.g 'bookings.seh.com' */
        /* Validate most legal websites */
        /* regex by Viktor Nagy, http://regexlib.com/REDetails.aspx?regexp_id=2629 */
        return /^((http|https|ftp):\/\/(www\.)?|www\.)[a-zA-Z0-9\_\-]+\.([a-zA-Z]{2,4}|[a-zA-Z]{2}\.[a-zA-Z]{2})(\/[a-zA-Z0-9\-\._\?\&=,'\+%\$#~]*)*$/.test(
          v
        );
      }
    }
  },
  createdDate: Date,
  updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
recommendationSchema.pre("save", function(next) {
  this.updatedDate = new Date();
  if (!this.createdDate) {
    this.createdDate = new Date();
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Recommendation = mongoose.model("Recommendation", recommendationSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Recommendation;
