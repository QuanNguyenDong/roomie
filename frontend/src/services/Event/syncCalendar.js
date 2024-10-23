import { gapi } from 'gapi-script';
import axios from 'axios';

const CLIENT_ID = 'your-client-id';
const API_KEY = 'your-api-key';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

export const createEvent = async (newEvent) => {
    try {
        const res = await axios.post(`${global.route}/events/create`, newEvent, {
            withCredentials: true,
        });
        return res.data.event;
    } catch (error) {
        console.error('Error creating event:', error);
    }
};

export const checkEventExists = async (eventTitle, eventStart) => {
    try {
        const res = await axios.get(`${global.route}/events/check`, {
            params: {
                eventname: eventTitle,
                startDate: eventStart,
            },
            withCredentials: true,
        });
        return res.data.exists;
    } catch (error) {
        console.error('Error checking if event exists:', error);
        return false;
    }
};

export const initGoogleApiClient = () => {
    return new Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                scope: SCOPES,
            }).then(() => {
                resolve();
            }).catch(error => {
                console.error('Error initializing Google API client:', error);
                reject(error);
            });
        });
    });
};

export const syncCalendarEvents = async () => {
    try {
        await gapi.auth2.getAuthInstance().signIn();
        
        const response = await gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime',
        });

        const events = response.result.items;

        if (events.length > 0) {
            for (const event of events) {
                const eventTitle = event.summary || 'No Title';
                const eventStart = event.start.dateTime || event.start.date;
                const eventEnd = event.end.dateTime || event.end.date;

                const eventExists = await checkEventExists(eventTitle, eventStart);

                if (!eventExists) {
                    const newEvent = {
                        eventname: eventTitle,
                        startDate: eventStart,
                        endDate: eventEnd,
                    };

                    await createEvent(newEvent);
                }
            }
        }
    } catch (error) {
        console.error('Error syncing calendar events:', error);
        throw error;
    }
};
