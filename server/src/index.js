const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const status_messages = require('./shared/status_messages');
const route_calendar = require('./routes/calendar.routes.js');
const morgan = require('morgan')

// API 
const port = process.env.API_PORT || 8080;
const app = express();

if(!process.env.CAL_ID || !process.env.CAL_FILENAME)
{
    console.log("Environment variables not set!")
    process.exit(0);
}


app.use(cors())
app.use(morgan('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())
app.use("/api", route_calendar());

app.use(function (req, res, next) {
    return res.status(404).json(status_messages.RESOURCE_NOT_FOUND);
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

process.once('SIGTERM', function (code) {
    console.log('SIGTERM received...');
    process.exit(0);
});




