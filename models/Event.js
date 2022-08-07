// importing Schema from mongoose
const { Schema, model } = require("mongoose");

// creating event schema
const EventSchema = Schema({
  // event title
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  // event start date
  start: {
    type: Date,
    required: [true, "Start date is required"],
  },
  // event end date
  end: {
    type: Date,
    required: [true, "End date is required"],
  },
  // notes
  notes: {
    type: String,
  },
  // user 
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

EventSchema.methods.toJSON = function () {
  const { __v, ...event } = this.toObject();
  return event;
};

// export
module.exports = model("Event", EventSchema);
