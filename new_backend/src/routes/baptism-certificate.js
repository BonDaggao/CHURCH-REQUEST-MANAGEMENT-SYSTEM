const router = require('express').Router();
const baptismCertificateController = require('../controllers/baptismal-certificate-controller');
const { SchemaValidator } = require('../core/validator');
const employeeSchema = require('../validators/employee-schema');



router.get('/:id', 
baptismCertificateController.getAllBaptismalCertificates);

router.post(
  '/',
  baptismCertificateController
.create
);

router.put(
  '/:id',
  baptismCertificateController
.updateBaptismalCertificateByID
);

router.delete('/:id', 
baptismCertificateController.deleteBaptismalCertificateByID);

module.exports = router;