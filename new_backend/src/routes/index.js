const router = require('express').Router();
const employee = require('./employee');
const user = require('./user');
const baptism = require('./baptism');
const marriage = require('./marriage');
const confession = require('./confession')
const houseBlessing = require('./house-blessing')
const confrimation = require('./confirmation')
const anointing = require('./anointing')
const marriageCertificate = require('./marriage-certificate')
const massCard = require('./mass-cards')
const baptism_certificate = require('./baptism-certificate')
const mailer = require('./mailer')



router.use('/mailsender', mailer)
router.use('/employees', employee);
router.use('/user', user);
router.use('/marriage', marriage);
router.use('/baptism', baptism);
router.use('/confession', confession)
router.use('/house-blessing', houseBlessing)
router.use('/confirmation', confrimation)
router.use('/anointing', anointing)
router.use('/marriage-certificate', marriageCertificate)
router.use('/mass-cards', massCard)
router.use('/baptismal-certificate', baptism_certificate)




module.exports = router;
