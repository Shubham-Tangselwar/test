const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: Number },
  name: { type: String, minlength: 3, maxlength: 20, required: true },
  mobile: {
    type: String,
    minlength: 10,
    maxlength: 12,
    required: true,
    unique: true,
  },
  email: { type: String, minlength: 5, maxlength: 50, required: true },
  address: {
    street: String,
    locality: String,
    city: String,
    state: String,
    pincode: String,
    coordinatesType: String,
    coordinates: [Number],
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  status: { type: Number, required: true },
});
userSchema.plugin(AutoIncrement, { inc_field: "userId" });

const User = mongoose.model("User", userSchema);

module.exports = User;
