var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', quizController.load);
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', function(req, res){
  res.render('author', {author: 'Oscar Navarro', foto:'images/foto.png'});
});
router.get('/*', function(req, res){
  res.send("La pagina que busca no existe");
});
module.exports = router;
