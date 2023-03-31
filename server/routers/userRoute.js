const express = require('express');
const { requestUser , allCase ,updateCase ,removeCase ,listEvent ,createEvent} = require('../controllers/calendarController');
const router = express.Router();

// //สร้าง case 
// router.post('/createcase', requestUser)


router.post('/event', createEvent)


router.get("/list-event", listEvent);


// //เรียกดูเคสทั้งหมด
// router.get('/listcase', allCase)

// // เรียกดูเคส 1 เคส
// router.get('/findcase/:id', findCase)


// // update case
// router.put('/update/:id', updateCase)

// // delete case
// router.delete('/delete/:id', removeCase)



module.exports = router;