const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')

router.get('/', loginController.getLogInPage)
router.get('/login', loginController.getLogInPage)
router.get('/register', loginController.getRegisterPage)
router.post('/register', loginController.addUser)
module.exports = router;