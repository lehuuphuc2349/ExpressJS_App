var UserDb = require("../model/model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  const user = new UserDb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  user
    .save(user)
    .then((data) => {
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some Error" });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    UserDb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: err.message || "Some Error" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    UserDb.find()
      .then((user) => res.send(user))
      .catch((err) => {
        res.send(err);
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty" });
  }
  const id = req.params.id;
  UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  UserDb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Cannot Delete User" });
      } else {
        res.send("Delete Successful");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
