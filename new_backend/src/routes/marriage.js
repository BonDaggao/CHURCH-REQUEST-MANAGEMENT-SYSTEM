const router = require('express').Router();
const marriageController = require('../controllers/marriage-controller');
const { SchemaValidator } = require('../core/validator');
const employeeSchema = require('../validators/employee-schema');



router.get('/:id', 
marriageController.getAllMarriages);

router.post(
  '/',
  marriageController.create
);

router.put(
  '/:id',
  marriageController.updateMarriageByID
);

router.get('/details/:id', 
marriageController.getById);

router.delete('/:id', 
marriageController.deleteMarriageByID);

router.get('/admin/all', 
marriageController.admingetAllMarriages);

router.get('/admin/aprroved', 
marriageController.getAllApprovedMarriages);

router.get('/admin/rejected', 
marriageController.getAllRejectedMarriages);

router.get('/admin/pending', 
marriageController.getAllPendingMarriages);

router.put(
  '/approve/:id',
  marriageController.approveMarriages
);
router.put(
  '/reject/:id',
  marriageController.rejectMarriages
);

module.exports = router;