const controller = require("../controllers/calendar.controller");
const express = require('express');


function createRouter() {
  const router = express.Router();

  router.get('/calendar/ics', [], controller.getICal);
  router.get('/calendar/events', [], controller.getAllEvents);

  return router;
}

module.exports = createRouter;