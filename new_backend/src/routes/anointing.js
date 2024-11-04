const router = require('express').Router();
const anointingController = require('../controllers/anointing-controller');
const { SchemaValidator } = require('../core/validator');
const employeeSchema = require('../validators/employee-schema');



router.get('/:id', 
anointingController.getAllAnointings);

router.post(
  '/',
  anointingController.create
);

router.get('/details/:id', 
  anointingController.getById);

router.put(
  '/:id',
  anointingController.updateAnointingByID
);

router.get('/admin/all', 
anointingController.admingetAllAnointings);

router.get('/admin/aprroved', 
anointingController.getAllApprovedAnointings);

router.get('/admin/rejected', 
anointingController.getAllRejectedAnointings);

router.get('/admin/pending', 
anointingController.getAllPendingAnointings);

router.put(
  '/approve/:id',
  anointingController.approveAnointings
);
router.put(
  '/reject/:id',
  anointingController.rejectAnointings
);


module.exports = router;