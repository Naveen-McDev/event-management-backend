// importing jwt package
const jwt = require("jsonwebtoken");

// function expression to generate jwt token with the given input

const generateJWT = (id, name) => {
  return new Promise((resolve, reject) => {
    const payload = { id, name };
    // creating token with expiry time
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          // response if error
          console.log("JWT Generation Error", err);
          reject("Can't generate web token.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

// export
module.exports = generateJWT;
