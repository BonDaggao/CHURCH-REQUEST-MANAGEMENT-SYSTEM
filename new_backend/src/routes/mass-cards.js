const router = require('express').Router();
const massCardsController = require('../controllers/mass-cards-controller');
const { SchemaValidator } = require('../core/validator');
const employeeSchema = require('../validators/employee-schema');



router.get('/:id', 
massCardsController.getAllMassCards);

router.post(
  '/',
  massCardsController
.create
);

router.put(
  '/:id',
  massCardsController
.updateMassCardsByID
);

router.delete('/:id', 
massCardsController.deleteMassCardsByID);

module.exports = router;