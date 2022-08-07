// importing Schema from mongoose
const { Schema, model } = require("mongoose");

// creating user schema
const UserSchema = Schema({
  // user name
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  // user email
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
  },
  // password
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

// export
module.exports = model("User", UserSchema);
