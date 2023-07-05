const Joi = require("joi");
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      subscriptionRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  subscriptionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  subscriptionFee: {
    type: Number,
    min: 0,
  },
});

subscriptionSchema.statics.lookup = function (customerId, movieId) {
  return this.findOne({
    "customer._id": customerId,
    "movie._id": movieId,
  });
};

const Subscription = mongoose.model("Subscriptions", subscriptionSchema);

function validateSubscription(subscription) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(subscription, { abortEarly: false });
}

exports.Subscription = Subscription;
exports.validateSubscription = validateSubscription;
