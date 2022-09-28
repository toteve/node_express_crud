// requerimos el componente Router e instanciamos para crear un enrutador router
const { Router } = require('express');
const router = new Router();

// requerimos una libreria externa underscore
const _ = require('underscore');

// requerimos usar una fuente de datos desde un archivo json
const movies = require('../sample.json');

// operaciones a realizar con el archivo movies

// en la raiz con GET solo mostrar el contenido de todas las movies
router.get('/', (req, res) => {
    res.json(movies);
});

// en busca de una pelicula segun su id y mostrarla
router.get('/:id', (req, res) => {
    const { id } = req.params; // se captura el parametro enviado
    console.log("Id params: ", id);
    let sw = '0';
    console.log("Movies: ", movies);
    //if (id && title && director && year && rating) {
    _.each(movies, (movie) => {
       if (movie.id === id) {
            res.send(movie);
            sw = '1';
        }
    });
        
    if ( sw === '0') {
        res.status(500).json({error: 'There was an error. Not Found Movie'});
    }
});


// en la ruta raiz con POST agregar nueva pelicula
router.post('/', (req, res) => {
    const id = movies.length + 1; // obteniendo el id en base a longitud de array movies

    // destructuring para obtener cada parte del req.body que viene de postman
    const { title, director, year, rating } = req.body;
    // creo newMovie con los datos del req.body mas agregando el id para que sea igual sample.json
    const newMovie = { ...req.body, id };

    // validamos si estan todos los campos necesarios
    if (id && title && director && year && rating) {
        // agregar a movies la newMovie
        movies.push(newMovie);
        // mostrar por navegador desde el BE
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error.'}); // caso de error en datos 
    }
});


// en busca de una pelicula segun su id y actualizar
router.put('/:id', (req, res) => {
    const { id } = req.params; // se captura el parametro enviado
    const { title, director, year, rating } = req.body;
    if (id && title && director && year && rating) {
        _.each(movies, (movie, i) => {
            if (movie.id === id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


// en busca de una pelicula segun su id y eliminar
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movies.splice(i, 1);
            }
        });
        res.json(movies);
    }
});

module.exports = router;