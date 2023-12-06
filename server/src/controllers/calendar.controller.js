const status_messages = require('../shared/status_messages');
const { google } = require('googleapis');
const fs = require('fs');
const moment = require("moment-timezone")
const ical = require('ical-generator');

// https://www.geeksforgeeks.org/how-to-integrate-google-calendar-in-node-js/

// get credentials
const rawdata = fs.readFileSync(__dirname + '/../google-auth.json');
const google_auth = JSON.parse(rawdata);

//setup auth object
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const jwtClient = new google.auth.JWT(
    google_auth.client_email,
    null,
    google_auth.private_key,
    SCOPES
);
const calendar = google.calendar({
    version: 'v3',
    project: google_auth.project_id,
    auth: jwtClient
});


exports.getICal = async (req, res) => {
    

    try {
        let threeMonthsBack = new Date()
        threeMonthsBack.setMonth(threeMonthsBack.getMonth() - 3);

        calendar.events.list({
            calendarId: process.env.CAL_ID,
            timeMin: threeMonthsBack.toISOString(),
            maxResults: 250, // 250 = default
            singleEvents: true
        }, (error, result) => {
            if (error) {
                return res.status(404).send(status_messages.NO_CALENDAR_AVAILABLE);
            } else {
            
                let cal = ical({name: 'Buddynetwork'});

                result.data.items.forEach( event => {
             
                    let start;
                    let end;

                    if (event.start.dateTime)
                      start = moment(new Date(event.start.dateTime), event.start.timeZone);
                    else
                      start = moment(new Date(event.start.date), 'Europe/Vienna').tz('Europe/Vienna');

                    if (event.end.dateTime)
                      end = moment(new Date(event.end.dateTime), event.end.timeZone);
                    else
                      end = moment(new Date(event.end.date), 'Europe/Vienna').tz('Europe/Vienna');

                    cal.createEvent({
                        start: start,
                        end: end,
                        summary: event.summary,
                        description: event.description,
                        location: event.location,
                        allDay: event.start.date?true:false,
                        timeZone: 'Europe/Vienna'
                    })
                });
            
                res.setHeader('Content-disposition', 'attachment; filename="'+process.env.CAL_FILENAME+'"');
                res.status(200).send(cal.toString())
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(status_messages.BAD_REQUEST);
    }
};



exports.getAllEvents = async (req, res) => {


    try {
        let threeMonthsBack = new Date()
        threeMonthsBack.setMonth(threeMonthsBack.getMonth() - 3);

        calendar.events.list({
            calendarId: process.env.CAL_ID,
            timeMin: threeMonthsBack.toISOString(),
            maxResults: 2000, 
            singleEvents: true
        }, (error, result) => {
            if (error) {
                return res.status(404).send(status_messages.NO_CALENDAR_AVAILABLE);
            } else {
                result.data.items.forEach(ev => {
                    ev.htmlLink = '';
                    ev.creator = {};
                    ev.organizer = {};
                    ev.kind = '';
                    ev.etag = '';
                    ev.status = '';
                    ev.iCalUID = '';
                    ev.eventType = '';
                    ev.reminders = {};
                    ev.transparency = '';
                });

                return res.status(200).send(result.data.items);
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(status_messages.BAD_REQUEST);
    }
};

