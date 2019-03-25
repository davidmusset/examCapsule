var express = require('express');
var router = express.Router();
var mongoose = require('../Models/db');
var request = require('request');
var ProjectModel = require('../Models/Project');

/* GET home page. */
router.get('/', function(req, res, next) {
  request("https://capsule-exams.herokuapp.com/api/capsule/projects", function(error, response, body) {
    var result = JSON.parse(body)
    res.json(result);
  });
});

router.get('/projects', function(req, res, next) {
  console.log("hello there back");
  ProjectModel.find(
    function (err, datas) {
      res.json(datas);
    }
  );
});

router.post('/projects', function(req, res, next) {

  // Insertion d'un nouveau projet
  var newProject = new ProjectModel ({
    projectName: req.body.projectName,
    projectUrl: req.body.projectUrl,
    projectDesc: req.body.projectDesc,
    projectDaysSpent: req.body.projectDaysSpent,
    projectStackFront: req.body.projectStackFront,
    projectStackBack: req.body.projectStackBack
  });

// Sauvegarde
  newProject.save(
      function (error, user) {
       }
  );

  res.json({ result: true });


});


router.delete('/projects/:projectName', function(req, res, next) {
  ProjectModel.deleteOne(
    {projectName: req.params.projectName},
    function(error) {
    }
  );

  res.json({ result: true });

});


module.exports = router;
