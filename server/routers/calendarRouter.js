const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/calendarController');






//* endpoint    localhost:3030/api/event
//* Method      GET
//* Access      public

router.get('/event' ,createEvent)



















module.exports = router;