const db = require("../models");
const Trip = db.trips;

// Create and Save a new Trip
exports.create = (req, res) => {
  // Validate request
  console.log("create");
  if (!req.body.nazwa) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Trip
  const trip = new Trip({
    id: req.body.id,
    nazwa: req.body.nazwa,
    docelowy_kraj: req.body.docelowy_kraj,
    data_rozpoczecia: req.body.data_rozpoczecia,
    data_zakonczenia: req.body.data_zakonczenia,
    cena: req.body.cena,
    miejsca: req.body.miejsca,
    opis: req.body.opis,
    zdjecie: req.body.zdjecie,
  });
  // Save Trip in the database
  trip
    .save(trip)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Trip."
      });
    });
};

// Retrieve all Trips from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  console.log("FindALL", req.query)
  var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};

  Trip.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Trip with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;
//   console.log("FindONE",id)
//   console.log("FindONE",req.params.id)

//   Trip.findById(id)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found Trip with id " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Trip with id=" + id });
//     });
// };


// Find a single Trip with an id
exports.findOne = (req, res) => {
  const trip_id = req.params.id;
  console.log("FindONE", trip_id)
  // console.log("FindONE",req.params.id)
  if (!trip_id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Trip.find({ id: req.params.id })
    .then(data => {
      console.log("FindONE", data)
      if (!data.length)
        res.status(404).send({ message: "Not found Trip with id " + trip_id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Trip with id=" + id });
    });
};
// exports.findOne((req, res) => {docelowy_kraj: req.params.docelowy_kraj});

// Update a Trip by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const trip_id = req.params.id;
  console.log("UPDATE", trip_id)

  Trip.update({ id: trip_id }, req.body, { multi: true }, function (err, user) {
    console.log(`UPDATE: ${trip_id} req.body:  ${JSON.stringify(req.body)}`);
    console.log(`User: ${user} err:  ${err}`);
    if (err) {
      return res.status(500).send({
        message: "Error updating Trip with id=" + trip_id
      });
    }
    if (!user) {
      res.status(404).send({
        message: `Cannot update Trip with id=${trip_id}. Maybe Trip was not found!`
      });
    }
    else {
      return res.send({ message: "Trip was updated successfully." });
    }
  });
};

// Delete a Trip with the specified id in the request
exports.delete = (req, res) => {
  const trip_id = req.params.id;
  console.log("DELETE", req.params.id);

  Trip.deleteOne({ id: trip_id }, function (err, user) {
    console.log(`DELETE: ${trip_id}`);
    console.log(`User: ${user} err:  ${err}`);
    if (err) {
      console.log("W ERORZE");
      return res.status(500).send({
        message: "Error deleting Trip with id=" + trip_id
      });
    }
    if (!user) {
      res.status(404).send({
        message: `Cannot delete Trip with id=${trip_id}. Maybe Trip was not found!`
      });
    }
    else {
      return res.send({ message: "Trip was deleted successfully." });
    }
  });

  // Trip.findByIdAndRemove(id, { useFindAndModify: false })
  //   .then(data => {
  //     if (!data) {
  //       res.status(404).send({
  //         message: `Cannot delete Trip with id=${id}. Maybe Trip was not found!`
  //       });
  //     } else {
  //       res.send({
  //         message: "Trip was deleted successfully!"
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Could not delete Trip with id=" + id
  //     });
  //   });
};

// Delete all Trips from the database.
exports.deleteAll = (req, res) => {
  Trip.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Trips were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Trips
exports.findAllPublished = (req, res) => {
  Trip.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
