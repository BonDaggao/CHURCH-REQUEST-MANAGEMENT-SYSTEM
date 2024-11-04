const router = require('express').Router();
const marriageCertificateController = require('../controllers/marriage-certificate-controller');
const { SchemaValidator } = require('../core/validator');
const employeeSchema = require('../validators/employee-schema');



router.get('/:id', 
marriageCertificateController.getAllMarriageCertificates);

router.post(
  '/',
  marriageCertificateController
.create
);

router.put(
  '/:id',
  marriageCertificateController
.updateMarriageCertificateByID
);

router.delete('/:id', 
marriageCertificateController.deleteMarriageCertificateByID);

module.exports = router;