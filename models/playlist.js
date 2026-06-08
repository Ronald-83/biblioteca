const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const JogadorSchema = new Schema({
  name: { type: String, required: true, maxLength: 200 },
  position: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLength: 1000 },
  clubs: [{ type: Schema.ObjectId, ref: "Clube" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Virtual for this jogador instance URL.
JogadorSchema.virtual("url").get(function () {
  return "/catalog/jogador/" + this._id;
});

// Virtual for formatted creation date
JogadorSchema.virtual("created_at_formatted").get(function () {
  return DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATE_MED);
});

// Virtual for formatted update date
JogadorSchema.virtual("updated_at_formatted").get(function () {
  return DateTime.fromJSDate(this.updated_at).toLocaleString(DateTime.DATE_MED);
});

// Pre-save hook to update the updated_at field
JogadorSchema.pre("save", function () {
  this.updated_at = new Date();
});

// Export model.
module.exports = mongoose.model("Jogador", JogadorSchema);
