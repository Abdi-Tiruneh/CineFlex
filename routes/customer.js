const { Customer, validateCustomer } = require("../models/customer");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const admin = require("../middleware/admin");
const validate = require("../middleware/validate");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const customers = await Customer.find().select("-__v").sort("name");
  res.send(customers);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const customer = await Customer.findById(req.params.id).select("-__v");

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.post("/", validate(validateCustomer), async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  await customer.save();

  res.send(customer);
});

router.put(
  "/:id",
  [validateObjectId, validate(validateCustomer)],
  async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
      { new: true }
    );

    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    res.send(customer);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
