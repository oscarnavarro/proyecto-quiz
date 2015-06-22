var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//cargar modulo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

sequelize.sync().then(function(){
  Quiz.count().then(function(count){
    if(count === 0){
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
      });
      Quiz.create({ pregunta: 'Capital de Portugal',
                    respuesta: 'Lisboa'
      });
      Quiz.create({ pregunta: 'Año en que finalizó la segunda guerra mundial',
                    respuesta: '1945'
      });
      Quiz.create({ pregunta: 'Quién escribió el libro Don Quijote de la Mancha',
                    respuesta: 'Miguel de Cervantes Saavedra'
      })
      .then(function(){console.log('Base de Datos inicializada');});
    };
  });
});
