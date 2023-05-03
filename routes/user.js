//TODO : view Profile

const router = require('express').Router();
const token = require('./jwtVerify');

const userController = require('../controllers/user');

//get your profile
router.get('/profile',token,userController.getProfile)

//edit your profile
router.put('/profile',token,userController.editProfile);


//delete your profile
router.delete('/',token,userController.deleteProfile);

//get all users 
router.get('/',token,userController.getAllUsers);

//deleteById
router.delete('/:userID',token,userController.deleteUserById)




module.exports = router;