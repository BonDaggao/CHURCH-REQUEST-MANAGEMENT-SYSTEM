const router = require('express').Router();
const baptismcontroller = require('../controllers/baptism-controller');
const { SchemaValidator } = require('../core/validator');
const employeeSchema = require('../validators/employee-schema');



router.get('/:id', 
baptismcontroller.getAllBaptisms);

router.get('/details/:id', 
baptismcontroller.getById);

router.put(
  '/:id',
  baptismcontroller.updateByID
);

router.post(
  '/',
  baptismcontroller.create
);

router.get('/admin/all', 
baptismcontroller.admingetAllBaptisms);

router.get('/admin/aprroved', 
baptismcontroller.getAllApprovedBaptisms);

router.get('/admin/rejected', 
baptismcontroller.getAllRejectedBaptisms);

router.get('/admin/pending', 
baptismcontroller.getAllPendingBaptisms);

router.put(
  '/approve/:id',
  baptismcontroller.approveBaptisms
);
router.put(
  '/reject/:id',
  baptismcontroller.rejectBaptisms
);
module.exports = router;