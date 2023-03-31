const Event = require("../models/caseModel");

// let count = 0;
// exports.requestUser = async (req, res) => {
//   const { reporter, typeproblem, detail, campgame, wallet, editors } = req.body;
//   try {
//     count++;
//     const caseId = `BGMC${count.toString().padStart(5, "0")}`;
//     // const cases = await Cases.create({ reporter, typeproblem, casedetail ,campgame ,team,editors });
//     // res.json(cases);
//     let cases = await Cases.findOne({});
//     cases = new Cases({
//       caseId,
//       reporter,
//       typeproblem,
//       detail,
//       campgame,
//       wallet,
//       editors,
//     });
//     await cases.save();
//     res.send({message: 'Save case Success', cases})
//     console.log(cases);
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.findCase = async(req, res) => {
//   const id = req.params.id
//  // console.log(req.params.id);
//   try {
//     const cases = await Cases.find({_id: id}).exec();
//     res.json(cases)

//   } catch (error) {

//   }
// }

// exports.allCase = async(req, res) => {
//       try {
//         const cases = await Cases.find({}).exec();
//         res.json(cases)
//       } catch (error) {

//       }
// }

// exports.updateCase = async(req, res) => {
//   try {

//   } catch (error) {

//   }
// }
// exports.removeCase = async(req, res) => {
//   const id = req.params.id
//   try {
//     const cases = await Cases.findOneAndRemove({_id:id}).exec();
//     res.json({message: 'delete Success!!'})
//   } catch (error) {

//   }
// }

exports.createEvent = async (req, res) => {
  const { title, start, end } = req.body;
  try {
    // const event = await Event.create({ title, start, end });
    // await event.save();
    res.send(await new Event(req.body).save())
  } catch (error) {
    console.log(error);
  }
};


exports.listEvent = async (req, res) => {
  const { title, start, end } = req.body;
  try {
    const event = await Event.find({});
    res.send(event)

    //  res.send(await Event.find({}))
  } catch (error) {
    console.log(error);
  }
};
