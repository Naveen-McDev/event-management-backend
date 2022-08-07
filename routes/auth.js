/*
  Auth routes -> /api/auth
*/
// router from express
const { Router } = require("express");
// check from express validator
const { check } = require("express-validator");
// importing controllers for auth
const { createUser, loginUser, renewToken } = require("../controllers/auth");
// importing emailExist from database validators
const { emailExists } = require("../helpers/databaseValidators");
// validate fields middleware
const validateFields = require("../middlewares/validateFields");
// validate jwt middleware
const validateJWT = require("../middlewares/validateJWT");

const router = Router();

// registration route
router.post(
  "/register",
  [
    // validation
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name length must be max 32 characters").isLength({
      max: 32,
    }),
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "Password should be between 8-32 characters and should include 1 number, 1 symbol, 1 lowercase and 1 uppercase."
    ).isStrongPassword(),
    check("password", "Password should be between 8-32 characters.").isLength({
      max: 32,
    }),
    validateFields,
    emailExists,
  ],
  createUser
);

// login route
router.post(
  "/login",
  [
    // validation
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required.").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

// rew new token route
router.get("/renew", validateJWT, renewToken);

// exporting routes
module.exports = router;
