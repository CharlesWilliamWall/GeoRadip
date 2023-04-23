/* const { savePoint, deletePoint,deleteAllLPoints  } = require("../queries/points.queries");

//Objectif: Créer un nouvel point 
exports.savePointController = async (req, res, next) => {
  try {
    console.log(req.body);
    await savePoint(req.body);

    res.send("Point add");
  } catch (err) {
    res.json({ error: err.message });
  }
};




// supprimer un point
exports.deletePointController = async (req, res, next) => {
  try {
    const point = await deletePoint(req.body);
    res.send({ deleted: point });
  } catch (error) {
    res.send({ error: error.message });
  }
};

//supprimer tous ses points
exports.deletePointControl = async (req, res, next)  => {
  try {
   await deleteAllLPoints();
    res.send('All your points have been deleted');
  } catch (error) {
    res.send({ error: error.message });
  }
}; */
