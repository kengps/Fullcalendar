const Event = require("../models/caseModel");
const { notifyEvent, notifyEvenings } = require("../notify/lineNotify");
const moment = require("moment");
const cron = require("node-cron");

const { isSameDay } = require("date-fns");

const fs = require("fs");

exports.createEvent = async (req, res) => {
  const { title, start, end, color } = req.body;
  try {
    console.log(req.body);
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

// exports.currentDate = async (req,res) => {
//   try {
//     const day = new Date();
//     const currentD = await Event.find().sort({ start: 1 });

//       console.log('วันที่',day);
//     const currents = currentD.filter(item =>{
//       return day.toDateString() >= item.start.toDateString() &&
//               day.toDateString() <= item.end.toDateString()
//     })
//     console.log(currents);
//     res.send(currents);
//   } catch (error) {
//     console.log(error);
//   }
// }

const currentDate = async () => {
  try {
    const day = new Date();

    const currentDate = day.toLocaleDateString({
      weekday: "long",
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    const currentD = await Event.find().sort({ start: 1 });
    const currents = currentD.filter((item) => {
      return (
        isSameDay(day, item.start) ||
        isSameDay(day, item.end) ||
        (day >= item.start && day < item.end)
      );
    });

    //loop notify
    let msg = `${currentDate}_วันนี้มีกิจกรรม 📢 : \n`;
    for (t in currents) {
      const event = currents[t];

      let title = event.title;
      if (isSameDay(day, event.start)) {
        title += " (วันนี้)";
      }
      if (day >= event.start && day < event.end) {
        title += " (อยู่ระหว่างดำเนินการ)";
      }

      msg += `- ${title} \n`;
    }

    notifyEvent(msg);
    console.log(msg);


    // console.log(currents);
    //res.send(currents);
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
// const notifyEvening = async (req, res) => {
//   try {
//     const day = new Date();
//     const currentD = await Event.find().sort({ start: 1 });

//     const currents = currentD.filter((item) => {
//       return (
//         day.toDateString() >= item.start.toDateString() &&
//         day.toDateString() < item.end.toDateString()
//       );
//     });

//     //loop notify
//     for (t in currents) {
//       const msg = "วันนี้มีกิจกรรม :" + currents[t].title;
//       const filename =  currents[t].filename;

//       // console.log('msg:', );
//       // console.log('msg:',  currents.length);

//       notifyEvenings(msg, filename);
//     }

//     // console.log(currents);
//      res.send(currents);
//   } catch (error) {
//     console.log(error);
//   }
// };
//update หากมีการเปลี่ยนแปลง Event
exports.updateEvent = async (req, res) => {
  const { id, start, end } = req.body;
  console.log(req.body);
  try {
    const update = await Event.findOneAndUpdate(
      { _id: id },
      { start: start, end: end }
    );

    res.send(update);
  } catch (error) {
    console.log(error);
  }
};

//update หากมีการเปลี่ยนแปลง Event
exports.removeEvent = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { id } = req.params;
  try {
    const remove = await Event.findByIdAndDelete({ _id: id });
    console.log(remove);
    // ลบรูปภาพด้วย
    await fs.unlink("./public/uploads/" + remove.filename, (err) => {
      if (err) console.log("เกิดอะไร", err);

      console.log("remove success");
    });
    res.send("ทำการลบข้อมูลสำเร็จ");
  } catch (error) {
    console.log(error);
  }
};

//ให้ run function  .... ตลอด โดยตรง * แต่ละตำแหน่งจะหมายถึง  second (optional) minute hour day of month month ay of week
cron.schedule("05 17 * * *", () => {
  currentDate();
});
//ให้ run function  .... ตลอด โดยตรง * แต่ละตำแหน่งจะหมายถึง  second (optional) minute hour day of month month ay of week
// cron.schedule("* 11 * * *", () => {
//   notifyEvening();
// });

// exports.currentNoti = async (req, res) => {
//   try {
//     const day = new Date();

//     const currentDate = day.toLocaleDateString({
//       weekday: "long",
//       year: "2-digit",
//       month: "2-digit",
//       day: "2-digit",
//     });
//     const currentD = await Event.find().sort({ start: 1 });
//     const currents = currentD.filter((item) => {
//       return (
//         isSameDay(day, item.start) ||
//         isSameDay(day, item.end) ||
//         (day >= item.start && day < item.end)
//       );
//     });

//     //loop notify
//     let msg = `${currentDate}_วันนี้มีกิจกรรม 📢 : \n`;
//     for (t in currents) {
//       const event = currents[t];

//       let title = event.title;
//       if (isSameDay(day, event.start)) {
//         title += " (วันนี้)";
//       }
//       if (day >= event.start && day < event.end) {
//         title += " (อยู่ระหว่างดำเนินการ)";
//       }

//       msg += `- ${title} \n`;
//     }

//     //notifyEvent(msg);
//     console.log(msg);


//     // console.log(currents);
//     res.send(currents);
//   } catch (error) {
//     console.log(error);
//   }
// };
