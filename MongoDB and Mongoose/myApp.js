const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config(); // Ensure this line is present and at the top

console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define the schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

// Create the model
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Alberth Ruado",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"],
  });

  newPerson.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Example route to test createManyPeople function
// app.get("/create-many-people", (req, res) => {
//   const people = [
//     { name: "John Doe", age: 25, favoriteFoods: ["Pizza", "Burger"] },
//     { name: "Jane Smith", age: 30, favoriteFoods: ["Pasta", "Salad"] },
//     { name: "Alice Johnson", age: 35, favoriteFoods: ["Sushi", "Ramen"] },
//   ];

//   createManyPeople(people, (err, data) => {
//     if (err) return res.status(500).send(err.message);
//     res.json(data);
//   });
// });

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Example route to test findPeopleByName function
// app.get("/find-people-by-name/:name", (req, res) => {
//   const personName = req.params.name;
//   findPeopleByName(personName, (err, data) => {
//     if (err) return res.status(500).send(err.message);
//     res.json(data);
//   });
// });

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Example route to test findOneByFood function
// app.get("/find-one-by-food/:food", (req, res) => {
//   const food = req.params.food;
//   findOneByFood(food, (err, data) => {
//     if (err) return res.status(500).send(err.message);
//     res.json(data);
//   });
// });

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Example route to test findPersonById function
// app.get("/find-person-by-id/:id", (req, res) => {
//   const personId = req.params.id;
//   findPersonById(personId, (err, data) => {
//     if (err) return res.status(500).send(err.message);
//     res.json(data);
//   });
// });

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    // Modify the person object
    person.favoriteFoods.push("hamburger");

    // If favoriteFoods is not declared as [String], mark it as modified
    person.markModified("favoriteFoods");

    // Save the updated person
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// Example route to test findEditThenSave function
// app.get("/edit-then-save/:id", (req, res) => {
//   const personId = req.params.id;
//   findEditThenSave(personId, (err, data) => {
//     if (err) return res.status(500).send(err.message);
//     res.json(data);
//   });
// });

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

// Example route to test findAndUpdate function
app.get("/find-and-update/:name", (req, res) => {
  const personName = req.params.name;
  findAndUpdate(personName, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.json(data);
  });
});

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    done(null, removedPerson);
  });
};

// Example route to test removeById function
app.get("/remove-by-id/:id", (req, res) => {
  const personId = req.params.id;
  removeById(personId, (err, removedPerson) => {
    if (err) return res.status(500).send(err.message);
    res.json(removedPerson);
  });
});

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

// Example route to test removeManyPeople function
app.get("/remove-many-people", (req, res) => {
  removeManyPeople((err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json(result);
  });
});

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(2) // Limit to 2 results
    .select("-age") // Hide the age field
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
