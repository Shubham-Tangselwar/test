const express = require("express");

const UserCtrl = require("../controllers/user.controller");
const router = express.Router();

router.get("/byCreateAt", UserCtrl.getAllUsersSortByCreateAt); //get user based on created date

router.get("/nearMe", UserCtrl.getAllUserNearMe); //api/v1/user/nearMe?lang=-24.2121&lat=40.145

router.get("/:id", UserCtrl.getUserById); //get single user

router.post("/", UserCtrl.createUser); //add new user

router.put("/:id", UserCtrl.updateUser); //update existing user

router.delete("/:id", UserCtrl.deleteUser); //delete  user set state=0

router.get("/", UserCtrl.getAllUsers); // fetch all user

module.exports = router;
