//bcryptjs package
const bcryptjs = require("bcryptjs");

// importing user models schema 
const User = require("../models/user");

//importing from helper for generating the jwt token
const generateJWT = require("../helpers/jwt");

//create user
const createUser = async (req, res) => {
  // destructuring the body from the request
  const { email, password } = req.body;
  try {

    // check if the user is already exists
    let user = await User.findOne({ email });

    //if user is already exist.. 
    if (user) {
      return res
        .status(400)
        .json({ ok: false, msg: "User email already exists" });
    }

    //if user is not already exist in the db
    user = new User(req.body);

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // saving user in the db
    await user.save();

    // generating the token 
    const token = await generateJWT(user.id, user.name);

    // success response
    return res.status(201).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    // response if error
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

// login user
const loginUser = async (req, res) => {

  // destructuring the body from the request
  const { email, password } = req.body;

  try {
    // check if the email already exist in the db
    const user = await User.findOne({ email });

    // if the user does not exist
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User email does not exist",
      });
    }

    // if user exist in the database

    // Verify if passwords match
    const validPassword = bcryptjs.compareSync(password, user.password);
    // if password doesn't match
    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        msg: "Invalid password.",
      });
    }

    // if password matches.. then generate token
    const token = await generateJWT(user.id, user.name);

    // success response
    return res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    // response if error
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

// renew the token
const renewToken = async (req, res) => {
  // destructuring the body from request
  const { id, name } = req;

  // generate token with the helper
  const token = await generateJWT(id, name);

  // success response
  res.json({ ok: true, user: { _id: id, name }, token });
};

// export
module.exports = { createUser, loginUser, renewToken };
