/*
  Events routes -> /api/events
*/

// router form express
const { Router } = require("express");
// check from express validator
const { check } = require("express-validator");
// importing controllers for event
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
// importing database validators
const {
  eventExistsById,
  isEventOwner,
} = require("../helpers/databaseValidators");
// importing helpers
const { isDate, isDateAfter } = require("../helpers/dateValidators");
// importing validatefields middleware
const validateFields = require("../middlewares/validateFields");
// importing validatejwt middleware
const validateJWT = require("../middlewares/validateJWT");

const router = Router();

// validatejwt middleware
router.use(validateJWT);

// get events route
router.get("/", getEvents);

// post event route
router.post(
  "/",
  [
    // validation
    check("title", "Title is required").not().isEmpty(),
    check("title", "Title length must be max 32 characters").isLength({
      max: 32,
    }),
    check("start", "Start date is required").not().isEmpty(),
    check("start", "Invalid start date").custom(isDate),
    check("end", "End date is required").not().isEmpty(),
    check("end", "Invalid end date").custom(isDate),
    check("end", "End date must be after start date").custom((end, { req }) =>
      isDateAfter(end, req.body.start)
    ),
    check("notes", "Notes length must be max 128 characters")
      .optional()
      .isLength({
        max: 128,
      }),
    validateFields,
  ],
  createEvent
);

// updating event route
router.put(
  "/:id",
  [
    // validation
    check("id", "Invalid event ID.").isMongoId(),
    check("title", "Title is required").not().isEmpty(),
    check("title", "Title length must be max 32 characters").isLength({
      max: 32,
    }),
    check("start", "Start date is required").not().isEmpty(),
    check("start", "Invalid start date").custom(isDate),
    check("end", "End date is required").not().isEmpty(),
    check("end", "Invalid end date").custom(isDate),
    check("notes", "Notes length must be max 128 characters")
      .optional()
      .isLength({
        max: 128,
      }),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  updateEvent
);

// delete event route
router.delete(
  "/:id",
  [
    // validation
    check("id", "Invalid event ID.").isMongoId(),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  deleteEvent
);

// export
module.exports = router;
