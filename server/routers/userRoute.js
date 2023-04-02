const express = require('express');
const multer = require("multer");
const {
  currentDate,
  currentMonth,
  listEvent,
  createEvent,
  updateImage,
} = require("../controllers/calendarController");
const router = express.Router();

// //สร้าง case 
// router.post('/createcase', requestUser)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "file-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

const upload = multer({ storage: storage }).single("fileupload");



router.post('/event', createEvent)


router.get("/list-event", listEvent);


router.post("/current-month", currentMonth);


//router.post("/update-image ", updateImage);


// router.get("/current-date", currentDate);



module.exports = router;