import { gapi } from 'gapi-script';
import axios from '../../tokenInterceptor';

const CLIENT_ID = '369183942201-o4gea6oikokag055u57gv0isi7ifoa2q.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDOhaxo4_OnnoM3dHXFZ6QgrhIUl7Mi-LE';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const createEvent = async (newEvent) => {
    try {
        const res = await axios.post(`${global.route}/events/create`, newEvent, {
            withCredentials: true,
        });
        return res.data.event;
    } catch (error) {
        console.error(error);
    }
};

const checkEventExists = async (eventTitle, eventStart) => {
    try {
        const res = await axios.get(`${global.route}/events/check`, {
            params: {
                eventname: eventTitle,
                startDate: eventStart,
            },
            withCredentials: true,
        });
        return res.data.exists;  // Assuming API returns a boolean value 'exists'
    } catch (error) {
        console.error('Error checking if event exists:', error);
        return false;  // Default to false if an error occurs
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
            'orderBy': 'startTime'
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
                } else {
                    // console.log(`Event "${eventTitle}" already exists. Skipping.`);
                }
            }
        }
    } catch (error) {
        console.error('Error syncing calendar events:', error);
        throw error;
    }
};