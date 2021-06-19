//Notes - user with status 0 is inactive
const User = require("../models/user.model");
class UserCtrl {
  static createUser = async (req, res) => {
    const u = req.body;

    const userObj = new User(u);

    await userObj
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
  };
  // end of createUser

  static updateUser = async (req, res) => {
    const { id } = req.params;
    const u = req.body;
    await User.findByIdAndUpdate(id, u, { new: true }, (err, result) => {
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
  };
  // end of updateUser

  static deleteUser = async (req, res) => {
    const { id } = req.params;

    await User.findByIdAndUpdate(
      id,
      { status: 0 },
      { new: true },
      (err, result) => {
        if (err)
          res
            .status(404)
            .send({ message: "Could not deleted the user", error: err });
        else
          res.status(200).send({
            message: "User deleted successsfully",
            data: result,
          });
      }
    );
  };
  // end of deleteUser

  static getUserById = async (req, res) => {
    const { id } = req.params;

    await User.findOne({
      _id: id,
      status: 1,
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
  };
  // end of getUserById

  static getAllUsers = async (req, res) => {
    await User.find({ status: 1 })
      .then((result) => {
        res.status(200).send({ message: "User List", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the users", error: err });
      });
  };
  // end of getAllUsers

  static getAllUsersSortByCreateAt = async (req, res) => {
    let page = req.params.page >= 1 ? parseInt(req.params.page) : 1;
    const limit = 3;
    await User.find({ status: 1 })
      .sort({ createdAt: -1 })
      .skip(limit * (page - 1))
      .limit(limit)
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
  };
  // End of getAllUsersSortByCreateAt

  static getAllUserNearMe = async (req, res) => {
    const { lang, lat } = req.query;
    try {
      await User.find({
        status: 1,
        "address.coordinates": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lang), parseFloat(lat)],
            },
          },
        },
      })
        .exec()
        .then((result) => {
          res.status(200).send({ message: "User Near me", data: result });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could Not find User  invalid coordinates",
            error: err,
          });
        });
    } catch (e) {
      res.status(500).send({ message: "Invalid coordinates " });
    }
  };
  // End of getAllUserNearMe
}
module.exports = UserCtrl;
