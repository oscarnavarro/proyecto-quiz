var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/author', function(req, res){
  res.render('author', {author: 'Oscar Navarro', foto:'images/foto.png'});
});
router.get('/*', function(req, res){
  res.send("La pagina que busca no existe");
});
module.exports = router;
