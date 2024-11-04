const router = require('express').Router();
const confirmationController = require('../controllers/confirmation-controller');
const { SchemaValidator } = require('../core/validator');
const employeeSchema = require('../validators/employee-schema');



router.get('/:id', 
confirmationController.getAllConfirmations);

router.post(
  '/',
  confirmationController.create
);

router.put(
  '/:id',
  confirmationController.updateConfirmationByID
);

router.get('/details/:id', 
confirmationController.getById);

router.delete('/:id', 
confirmationController.deleteConfirmationByID);

router.get('/admin/all', 
confirmationController.admingetAllConfirmations);

router.get('/admin/aprroved', 
confirmationController.getAllApprovedConfirmations);

router.get('/admin/rejected', 
confirmationController.getAllRejectedConfirmations);

router.get('/admin/pending', 
confirmationController.getAllPendingConfirmations);

router.put(
  '/approve/:id',
  confirmationController.approveConfirmations
);
router.put(
  '/reject/:id',
  confirmationController.rejectConfirmations
);

module.exports = router;