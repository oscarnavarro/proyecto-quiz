var models = require('../models/models.js');
var Sequelize = require('sequelize');
var estadisticas = {quiz:0, comentario:0,
                    mediacomentario:0, concomentario:0,
                    sincomentario:0 };

exports.generar = function (req, res, next) {
    models.Quiz.findAndCountAll().then(function(quiz){
      estadisticas.quiz=quiz;
  }).then(models.Comment.findAndCountAll().then(function (comentario) {
      estadisticas.comentario=comentario;
  })).then(function () {
      var promedio;
      promedio = estadisticas.comentario.count / estadisticas.quiz.count;
      estadisticas.mediacomentario = promedio;
  }).then(models.Comment.aggregate('QuizId', 'count', { distinct: true })
      .then(function (concomentario) {
         estadisticas.concomentario = concomentario;
  })).then(function () {
      var sin;
      sin = estadisticas.quiz.count - estadisticas.concomentario;
      estadisticas.sincomentario = sin;
  }).catch(function (err) { errors.push(err); })
    .finally(function () {
      next();
  });

};

exports.mostrar = function (req, res) {
  res.render('estadistica.ejs', {estadisticas: estadisticas, errors:[]});
}
