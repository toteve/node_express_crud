// requerimos con codigo COMMONJS  express y morgan que son framework y librerias externas
const express = require('express');
const morgan = require('morgan');

// instanciamos express y creamos la constante app
const app = express();

// settings configuracion de puerto a ocupar si existe uno o usar uno por defecto
app.set('port', process.env.PORT || 4000);
// espaciado del json a mostrar
app.set('json spaces',2);

// middlewares recibir por consola las operaciones (morgan), conversion desde formularios o postman
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes creamos las rutas a utilizar, requerimos un modulos internos en carpeta /routes
app.use(require('./routes/index.js')); // sino se indica el archivo, se buscara un index.js
app.use('/api/movies', require('./routes/movies.js')); // busca en /routes/movies.js, defino prefijo API
app.use('/api/users', require('./routes/users.js')); // busca en /routes/users.js, defino prefijo API

// ojo si colocaramos las rutas en el index seria app.get, app.post etcetera

// starting the server para que escuche de acuerdo al puerto seteado y mostrando un mensaje
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
