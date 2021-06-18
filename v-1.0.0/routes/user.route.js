const express = require("express");

const UserCtrl = require("../controllers/user.controller");
const router = express.Router();

router.get("/byCreateAt", UserCtrl.getAllUsersSortByCreateAt);

router.get("/nearMe", UserCtrl.getAllUserNearMe); //api/v1/user/nearMe?array=11.2121,40.145

router.get("/:id", UserCtrl.getUserById);

router.post("/", UserCtrl.createUser);

router.put("/:id", UserCtrl.updateUser);

router.delete("/:id", UserCtrl.deleteUser);

router.get("/", UserCtrl.getAllUsers);

module.exports = router;
