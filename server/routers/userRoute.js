const express = require('express');
const multer = require("multer");
const {
  currentDate,
  currentMonth,
  listEvent,
  createEvent,
  updateImage,

  notifyEvening,
  updateEvent,
  removeEvent,
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

// single("files"); ชื่อ files ต้องตรงกับกับส่วนของ client ที่มีการ   formData.append("files", files);
const upload = multer({ storage: storage }).single("files");



router.post('/event', createEvent)


router.get("/list-event", listEvent);

router.put("/update-event", updateEvent);

router.delete("/delete-event/:id", removeEvent);


router.post("/current-month", currentMonth);


router.post("/upload-image", upload, updateImage);



//ลบออกเพราะไม่ได้มีการใช้
//  router.get("/current-date", currentDate);


// //ลบออกเพราะไม่ได้มีการใช้
//  router.get("/current-date", notifyEvening);



module.exports = router;