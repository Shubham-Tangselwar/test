const User = require("../models/user.model");
class UserCtrl {
  static createUser(req, res) {
    const u = req.body;

    const userObj = new User(u);

    userObj
      .save()
      .then((result) => {
        res.status(200).send({ message: "User Created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created a user", error: err });
      });
  }
  // end of createUser
  static updateUser(req, res) {
    const { id } = req.params;
    const u = req.body;
    User.findByIdAndUpdate(id, u, { new: true }, (err, result) => {
      if (err)
        res
          .status(404)
          .send({ message: "Could not updated the user", error: err });
      else
        res.status(200).send({
          message: "User updated successsfully",
          data: result,
        });
    });
  }
  // end of updateUser
  static deleteUser(req, res) {
    const { id } = req.params;

    User.findByIdAndUpdate(id, { status: 0 }, { new: true }, (err, result) => {
      if (err)
        res
          .status(404)
          .send({ message: "Could not deleted the user", error: err });
      else
        res.status(200).send({
          message: "User deleted successsfully",
          data: result,
        });
    });
  }
  // end of deleteUser
  static getUserById(req, res) {
    const { id } = req.params;

    User.findOne({
      _id: id,
    })
      .then((result) => {
        res.status(200).send({ message: "User ", data: result });
      })

      .catch((err) => {
        console.log(err);
        res.status(404).send({
          message: "Could not load the user or User is Inactive",
          error: err,
        });
      });
  }
  // end of getUserById
  static getAllUsers(req, res) {
    User.find({ status: 1 })
      .then((result) => {
        res.status(200).send({ message: "User List", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the users", error: err });
      });
  }
  // end of getAllUsers

  static getAllUsersSortByCreateAt(req, res) {
    User.find({ status: 1 })
      .sort({ createdAt: -1 })
      .skip(10)
      .limit(10)
      .exec()
      .then((result) => {
        res.status(200).send({ message: "User List", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the users", error: err });
      });
  }

  static getAllUserNearMe(req, res) {
    const values = req.query.array.split(",");
    if (values.length > 1) {
      console.log(values[0]);
      User.find({
        "address.coordinates": {
          $geoWithin: {
            $centerSphere: [[values[0], values[1]], 637],
          },
        },
      })
        .exec()

        .then((result) => {
          res.status(200).send({ message: "User Near me", data: result });
        })
        .catch((err) => {
          res.status(500).send({ message: "Could Not find User", error: err });
        });
    } else {
      res.status(500).send({ message: "Invalid Data" });
    }
  }
}
module.exports = UserCtrl;
