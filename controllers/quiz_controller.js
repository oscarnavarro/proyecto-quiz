var models = require('../models/models.js');

exports.load = function (req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId'+ quizId));}
    }
  ).catch(function(error){next(error);});
};

exports.index = function (req, res) {
 if (req.query.search){
   var search = "%"+req.query.search.replace(/ /g, "%")+"%";
   models.Quiz.findAll(
       {where: ["pregunta like ?", search], order:'pregunta ASC'}
     ).then(function (quizes) {
       res.render('quizes/index.ejs', {quizes:quizes});
     }
   ).catch(function(error){next(error);});
 } else {
   models.Quiz.findAll().then(function (quizes) {
       res.render('quizes/index.ejs', {quizes:quizes});
     }
   ).catch(function(error){next(error);});

 }

};

exports.show = function(req, res){
  res.render('quizes/show', {quiz: req.quiz});
};

exports.answer = function(req, res){
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  console.log(req.quiz.respuesta);
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});

};
