/* const Point = require("../database/models/point.model");

//Objectif: sauver un point
exports.savePoint = async (data) => {
  const newPoint = new Point({
    id:data.id,
  marquer:data.marquer
  });
  return newPoint.save();
};

//Objectif: supprimer un point
exports.deletePoint = (data) => {
  return Point.findOneAndDelete({ id: data.id })
};

//Objectif: supprimer tous les points
exports.deleteAllLPoints = () => {
  return Point.deleteMany({});
} */