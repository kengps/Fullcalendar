require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')



//*path router
const mainRouter = require('./routers/calendarRouter');
const connextDB = require('./config/connextDB');

//*env
const port = process.env.PORT || 9000


//*database
connextDB();

const app = express();

//*router
app.use('/api', mainRouter)


//*middleware
app.use(morgan('dev'));
app.use(bodyParser.json({'limit': '20mb'}))
app.use(cors());



app.listen(port , () => console.log(`Server is running is... port ${port}`))














