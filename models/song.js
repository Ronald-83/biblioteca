const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const ClubeSchema = new Schema({
  name: { type: String, required: true, maxLength: 200 },
  city: { type: String, required: true, maxLength: 100 },
  founded: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
  championships: { type: Number, required: true, min: 0, default: 0 },
  description: { type: String, maxLength: 1000 },
  logo_url: { type: String },
  created_at: { type: Date, default: Date.now },
});

// Virtual for this clube instance URL.
ClubeSchema.virtual("url").get(function () {
  return "/catalog/clube/" + this._id;
});

// Virtual for formatted creation date
ClubeSchema.virtual("created_at_formatted").get(function () {
  return DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATE_MED);
});

// Export model.
module.exports = mongoose.model("Clube", ClubeSchema);
