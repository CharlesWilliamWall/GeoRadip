const mongoose = require("mongoose");

//const { coordonateSchema } = require("./coordonate.model");

/* const position  = mongoose.Schema ({
  x: {type:Number, required:true},
  y: {type:Number, required:true}
}) */

const coordonateSchema = mongoose.Schema({
  lng: { type: Number },
  lat: { type: Number},
});

const pointSchema = mongoose.Schema({
  id: { type: Number},
  name: { type: String },
  coordonates: {coordonateSchema},
  elevation: { type: Number},
  type: { type: String},
});

const Point = mongoose.model("point", pointSchema);

module.exports = { Point, pointSchema };
