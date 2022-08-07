// importing event model
const Event = require("../models/Event");

// get events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user", "name");

    // response if success
    return res.json({
      ok: true,
      events,
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

// create event
const createEvent = async (req, res) => {
  // destructure body from request
  const { title, start, end, notes } = req.body;

  const event = new Event({
    title,
    start,
    end,
    notes,
    user: req.id,
  });

  try {
    // adding event to the database
    await event.save();

    // success response
    return res.status(201).json({
      ok: true,
      event,
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

// update event
const updateEvent = async (req, res) => {
  // destructure the body from request
  const { id } = req.params;
  const { title, start, end, notes } = req.body;

  try {
    // find the event by id and update
    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        start,
        end,
        notes,
      },
      { new: true }
    );

    // response if success
    return res.json({ ok: true, event });
  } catch (error) {
    // response if error
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

// delete event
const deleteEvent = async (req, res) => {
  // destructure the body from request
  const { id } = req.params;

  try {
    // finding the event by id and then delete
    const event = await Event.findByIdAndDelete(id);

    // response if success
    return res.json({
      ok: true,
      event,
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

// export
module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
