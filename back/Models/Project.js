var mongoose = require('mongoose');

//Création du schéma de la bdd
var ProjectSchema = mongoose.Schema({
  projectName: String,
  projectUrl: String,
  projectDesc: String,
  projectDaysSpent: String,
  projectStackFront: [String],
  projectStackBack: [String],
});

//Création du type d'objet qui permet d'insérer
var ProjectModel  = mongoose.model('ProjectSchema', ProjectSchema);

module.exports = ProjectModel
