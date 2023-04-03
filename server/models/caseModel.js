const mongoose = require("mongoose");

const schemaCase = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    color: {
      type: String,
    },
    allDay: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
); //ทำการจัดเก็บข้อมูลช่วงเวลาในการสร้างหรือแก้ไข

module.exports = Events = mongoose.model("events", schemaCase);
