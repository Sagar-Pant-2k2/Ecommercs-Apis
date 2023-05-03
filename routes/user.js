const router = require('express').Router();
const token = require('./jwtVerify');

const userController = require('../controllers/user');

//get all users 
router.get('/',token,userController.getAllUsers);

//delete profile
router.delete('/',token,userController.deleteProfile);

//deleteById
router.delete('/:userID',token,userController.deleteUserById)

router.put('/editProfile',userController.editProfile);



module.exports = router;