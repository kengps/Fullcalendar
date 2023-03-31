const express = require('express');
const { requestUser , allCase ,updateCase ,removeCase ,findCase ,createEvent} = require('../controllers/userController');
const router = express.Router();

//สร้าง case 
router.post('/createcase', requestUser)

router.post('/event', createEvent)


//เรียกดูเคสทั้งหมด
router.get('/listcase', allCase)

// เรียกดูเคส 1 เคส
router.get('/findcase/:id', findCase)


// update case
router.put('/update/:id', updateCase)

// delete case
router.delete('/delete/:id', removeCase)



module.exports = router;