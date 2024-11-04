const router = require('express').Router();
const userController = require('../controllers/user-controller');
const authController = require('../controllers/auth-controller')
const { SchemaValidator } = require('../core/validator');
const userSchema = require('../validators/user-schema');

router.post(
  '/register',
  //SchemaValidator().setSchema(userSchema).scan,

  // Needs Admin Authentication for User Creation?
  //  mw.needsAdminAuthentication,  
  
  userController.create
);
router.post('/login',
authController.login
)

module.exports = router;