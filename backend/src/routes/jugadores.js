const { Router } = require('express');
const controller = require('../controllers/jugadoresController');
const { validateBody, validateId } = require('../middlewares/validate');
const { asyncHandler } = require('../middlewares/errorHandler');
const { jugadorFullSchema, jugadorPatchSchema } = require('../schemas/jugadorSchema');

const router = Router();

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', validateId, asyncHandler(controller.getOne));
router.post('/', validateBody(jugadorFullSchema), asyncHandler(controller.create));
router.put('/:id', validateId, validateBody(jugadorFullSchema), asyncHandler(controller.update));
router.patch('/:id', validateId, validateBody(jugadorPatchSchema), asyncHandler(controller.patch));
router.delete('/:id', validateId, asyncHandler(controller.remove));

module.exports = router;
