const express = require('express');
const router = express.Router();
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


// Validar el token en todos las rutas
router.use(validarJWT);


// Obtener eventos
router.get(
    '/',
     getEventos
);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento
);

// Actualizar evento
router.put(
    '/:id',
    actualizarEvento
);

// Borrar evento
router.delete(
    '/:id',
    eliminarEvento
);



module.exports = router;