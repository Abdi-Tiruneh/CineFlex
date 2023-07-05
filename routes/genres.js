const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const { Genre, validateGenre } = require("../models/genre");
const admin = require("../middleware/admin");
const validate = require("../middleware/validate");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().select("-__v").sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id).select("-__v");

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.post("/", [auth, validate(validateGenre)], async (req, res) => {
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put(
  "/:id",
  [auth, validateObjectId, validate(validateGenre)],
  async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
