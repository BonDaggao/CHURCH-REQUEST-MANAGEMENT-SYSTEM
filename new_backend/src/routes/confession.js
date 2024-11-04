const router = require('express').Router();
const confessionController = require('../controllers/confession-controller');
const { SchemaValidator } = require('../core/validator');
const employeeSchema = require('../validators/employee-schema');



router.get('/:id', 
confessionController.getAllConfessions);

router.post(
  '/',
  confessionController.create
);

router.put(
  '/:id',
  confessionController.updateConfessionByID
);

router.get('/details/:id', 
confessionController.getById);


router.delete('/:id', 
confessionController.deleteConfessionByID);

router.get('/admin/all', 
confessionController.admingetAllConfessions);

router.get('/admin/aprroved', 
confessionController.getAllApprovedConfessions);

router.get('/admin/rejected', 
confessionController.getAllRejectedConfessions);

router.get('/admin/pending', 
confessionController.getAllPendingConfessions);

router.put(
  '/approve/:id',
  confessionController.approveConfessions
);
router.put(
  '/reject/:id',
  confessionController.rejectConfessions
);

module.exports = router;