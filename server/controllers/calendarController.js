const Event = require("../models/caseModel");
const { notifyEvent, notifyEvenings } = require("../notify/lineNotify");
const moment = require("moment");
const cron = require("node-cron");

exports.createEvent = async (req, res) => {
  const { title, start, end, color } = req.body;
  try {
    // const event = await Event.create({ title, start, end });
    // await event.save();
    res.send(await new Event(req.body).save());
  } catch (error) {
    console.log(error);
  }
};

exports.listEvent = async (req, res) => {
  const { title, start, end } = req.body;
  try {
    const event = await Event.find({});
    res.send(event);

    //  res.send(await Event.find({}))
  } catch (error) {
    console.log(error);
  }
};

exports.currentMonth = async (req, res) => {
  const { mm } = req.body;
  const m = parseInt(mm);
  try {
    console.log(mm);

    const currentM = await Event.find({
      $expr: {
        $eq: [
          {
            //ให้เดือน = ตัวแปร
            $month: "$start",
          },
          m,
        ],
      },
    }).sort({ start: 1 });
    res.send(currentM);

    // console.log(currentM);
    // // const event = await Event.create({ title, start, end });
    // // await event.save();
    // res.send(await new Event(req.body).save());
  } catch (error) {
    console.log(error);
  }
};

const currentDate = async () => {
  try {
    const day = new Date();
    const currentD = await Event.find().sort({ start: 1 });

    const currents = currentD.filter((item) => {
      return (
        day.toDateString() >= item.start.toDateString() &&
        day.toDateString() <= item.end.toDateString()
      );
    });

    //loop notify
    for (t in currents) {
      const msg = "วันนี้มีกิจกรรม :" + currents[t].title;
      notifyEvent(msg);
    }

    // console.log(currents);
    // res.send(currents);
  } catch (error) {
    console.log(error);
  }
};

// upload รูปภาพ
exports.updateImage = async (req, res) => {
  try {
    const id = req.body.id;
    const filename = req.file.filename;
    const uploadImage = await Event.findOneAndUpdate(
      { _id: id },
      { filename: filename }
    );

    res.json(uploadImage);
  } catch (error) {
    res.status(500).send("server is error", error);
  }
};


// หากไม่มีรูปมันจะ error 
const notifyEvening = async (req, res) => {
  try {
    const day = new Date();
    const currentD = await Event.find().sort({ start: 1 });

    const currents = currentD.filter((item) => {
      return (
        day.toDateString() >= item.start.toDateString() &&
        day.toDateString() < item.end.toDateString()
      );
    });

    //loop notify
    for (t in currents) {
      const msg = "วันนี้มีกิจกรรม :" + currents[t].title;
      const filename =  currents[t].filename;
 
      // console.log('msg:', );
      // console.log('msg:',  currents.length);

      notifyEvenings(msg, filename);
    }

    // console.log(currents);
     res.send(currents);
  } catch (error) {
    console.log(error);
  }
};

//ให้ run function  .... ตลอด โดยตรง * แต่ละตำแหน่งจะหมายถึง  second (optional) minute hour day of month month ay of week
cron.schedule("05 11 * * *", () => {
  currentDate();
});
//ให้ run function  .... ตลอด โดยตรง * แต่ละตำแหน่งจะหมายถึง  second (optional) minute hour day of month month ay of week
// cron.schedule("* 11 * * *", () => {
//   notifyEvening();
// });


