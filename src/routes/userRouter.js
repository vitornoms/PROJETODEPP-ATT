const { Router } = require('express');
const router = Router();
const { storeUser } = require('../controller/usersController');
 
router.post('/user/create', storeUser);    
 
module.exports = router;