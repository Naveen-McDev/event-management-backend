// import event model
const Event = require("../models/Event");
// import user model
const User = require("../models/user");

// check event exist
const eventExistsById = async (req, res, next) => {
  // destructuring the body from request
  const { id } = req.params;
  // find if the event exist
  const event = await Event.findById(id);

  // if event does not exist
  if (!event) {
    return res.status(404).json({
      ok: false,
      msg: "Event id does not exist",
    });
  }

  next();
};

// is event owner
const isEventOwner = async (req, res, next) => {
  const userId = req.id;
  if (!userId) {
    return res.status(500).json({
      ok: false,
      msg: "Can't validate role if token is not validated.",
    });
  }
  const eventId = req.params.id;
  // finding event by id
  const event = await Event.findById(eventId);

  if (event.user.toString() !== userId) {
    return res.status(401).json({
      ok: false,
      msg: "Insufficient privileges",
    });
  }

  next();
};

// email exist
const emailExists = async (req, res, next) => {
  // destructuring the body from the request
  const { email } = req.body;
  // check if the user already exist
  const userExists = await User.findOne({ email });

  // if exist.. response
  if (userExists) {
    return res.status(400).json({
      ok: false,
      msg: "Email already exists",
    });
  }

  next();
};

// export
module.exports = {
  eventExistsById,
  isEventOwner,
  emailExists,
};
