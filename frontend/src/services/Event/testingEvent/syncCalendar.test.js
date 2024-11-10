import axios from 'axios';
import { checkEventExists, createEvent } from '../syncCalendar';

jest.mock('axios'); // Mock axios directly
jest.mock('gapi-script', () => ({
  gapi: {
    load: jest.fn(),
    auth2: {
      getAuthInstance: jest.fn(() => ({
        signIn: jest.fn().mockResolvedValue(),
      })),
    },
    client: {
      init: jest.fn().mockResolvedValue(),
      calendar: {
        events: {
          list: jest.fn().mockResolvedValue({
            result: { items: [] },
          }),
        },
      },
    },
  },
}));

describe('syncCalendar Service', () => {
  describe('checkEventExists', () => {
    it('should return true if the event exists', async () => {
      // Mock axios response to simulate an existing event
      axios.get.mockResolvedValueOnce({ data: { exists: true } });
      const result = await checkEventExists('Test Event', '2024-10-23T10:00:00Z');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${global.route}/events/check`, {
        params: { eventname: 'Test Event', startDate: '2024-10-23T10:00:00Z' },
        withCredentials: true,
      });
      expect(result).toBe(true);
    });

    it('should return false if the event does not exist', async () => {
      axios.get.mockResolvedValueOnce({ data: { exists: false } });
      const result = await checkEventExists('Nonexistent Event', '2024-10-23T10:00:00Z');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toBe(false);
    });

    it('should log an error and return false if checkEventExists request fails', async () => {
      const mockError = new Error('Network Error');
      axios.get.mockRejectedValueOnce(mockError);
      console.error = jest.fn();

      const result = await checkEventExists('Test Event', '2024-10-23T10:00:00Z');

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Error checking if event exists'),
        expect.any(Error) // Ensures an Error object is logged along with the message
      );
      expect(result).toBe(false);
    });
  });

  describe('createEvent', () => {
    it('should create a new event successfully', async () => {
      const newEvent = { eventname: 'New Event', startDate: '2024-10-23T10:00:00Z', endDate: '2024-10-23T11:00:00Z' };
      axios.post.mockResolvedValueOnce({ data: { event: 'createdEvent' } });

      const result = await createEvent(newEvent);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${global.route}/events/create`, newEvent, { withCredentials: true });
      expect(result).toBe('createdEvent');
    });

    it('should log error if createEvent fails', async () => {
      const mockError = new Error('Create event failed');
      axios.post.mockRejectedValueOnce(mockError);
      console.error = jest.fn();

      await createEvent({ eventname: 'Test Event' });

      // Check that console.error was called with the expected string and an Error object
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Error creating event'),
        expect.any(Error) // Ensures an Error object is logged along with the message
      );
    });
  });
});
