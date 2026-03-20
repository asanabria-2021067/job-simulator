const { Router } = require('express');
const controller = require('../controllers/jugadoresController');

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.remove);

module.exports = router;
