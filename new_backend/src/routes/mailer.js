const router = require('express').Router();
const mailerController = require('../controllers/mailer-controller');

router.post('/', mailerController.emailsend)

module.exports = router;