// requerimos el componente Router de express
const { Router } = require('express');

// instanciamos Router y creamos un enrutador router
const router = new Router();

// indicamos que hacer en la ruta /test con el metodo get, callback (req, res)
router.get('/test', (req, res) => {
    const data = {
        name: 'Tote',
        website: 'google.com'
    };
    res.json(data); // respuesta con data en formato json
    /* res.send("Hello World"); */ // respuesta con un string
});  

module.exports = router; // exportamos desde el modulo a el enrutador router
