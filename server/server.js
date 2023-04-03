require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser =require('body-parser')
const mongoose = require('mongoose');
const mainRouter = require("./routers/userRoute");
const app = express();

const port = process.env.PORT || 3001
const mongoAtlas = process.env.DATABASE




mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
}).then(() =>console.log('เชื่อมต่อฐานข้อมูลเรียบร้อย'))
.catch((err) => console.log('เกิดข้อผิดพลาด'+err))




//app.use(bodyParser.json({limit: "20mb"}))
app.use(express.static('public'))
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());




app.use("/api", mainRouter);


app.listen(port , ()=> console.log(`Server is running MY port ${port}`));









