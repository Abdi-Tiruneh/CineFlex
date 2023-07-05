const {
  Subscription,
  validateSubscription,
} = require("../models/subscription");

const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const mongoose = require("mongoose");
const Fawn = require("fawn");

const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", auth, async (req, res) => {
  const subscriptions = await Subscription.find().select("-__v");
  res.send(subscriptions);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const subscription = await Subscription.findById(req.params.id).select(
    "-__v"
  );

  if (!subscription)
    return res
      .status(404)
      .send("The subscription with the given ID was not found.");

  res.send(subscription);
});

router.post("/", [auth, validate(validateSubscription)], async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  let subscription = new Subscription({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      subscriptionRate: movie.subscriptionRate,
    },
  });

  new Fawn.Task()
    .save("subscriptions", subscription)
    .update(
      "movies",
      { _id: movie._id },
      {
        $inc: { subscriberCount: 1 },
      }
    )
    .run();

  res.send(subscription);
});

module.exports = router;
