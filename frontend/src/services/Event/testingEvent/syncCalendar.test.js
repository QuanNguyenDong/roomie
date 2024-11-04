import mockAxios from 'jest-mock-axios';
import { initGoogleApiClient, syncCalendarEvents, checkEventExists, createEvent } from '../syncCalendar';

// Mock gapi global object
global.gapi = {
  auth2: {
    getAuthInstance: jest.fn(() => ({
      signIn: jest.fn(),
    })),
  },
  client: {
    init: jest.fn(),
    calendar: {
      events: {
        list: jest.fn(),
      },
    },
  },
};

// Cleanup axios mocks after each test
afterEach(() => {
  mockAxios.reset();
});

describe('syncCalendar Service', () => {

  // Set a longer timeout for async tests
  jest.setTimeout(10000);

  describe('initGoogleApiClient', () => {
    it('should initialize the Google API client successfully', async () => {
      gapi.client.init.mockResolvedValueOnce(); // Mock init successful
      await expect(initGoogleApiClient()).resolves.toBeUndefined(); // Expect no errors
    });

    it('should reject if Google API client initialization fails', async () => {
      const mockError = new Error('Initialization failed');
      gapi.client.init.mockRejectedValueOnce(mockError); // Mock init failure
      await expect(initGoogleApiClient()).rejects.toThrow('Initialization failed');
    });
  });

  describe('syncCalendarEvents', () => {
    beforeEach(() => {
      gapi.auth2.getAuthInstance().signIn.mockResolvedValueOnce(); // Mock signing in
    });

    it('should sync calendar events and create new ones if they don’t exist', async () => {
      const mockGoogleEvents = [
        { summary: 'Event 1', start: { dateTime: '2024-10-23T10:00:00Z' }, end: { dateTime: '2024-10-23T11:00:00Z' } },
      ];

      gapi.client.calendar.events.list.mockResolvedValueOnce({ result: { items: mockGoogleEvents } });
      mockAxios.post.mockResolvedValueOnce({ data: { event: 'createdEvent' } });

      await syncCalendarEvents();
      expect(mockAxios.post).toHaveBeenCalledWith(`${global.route}/events/create`, expect.anything(), { withCredentials: true });
    });

    it('should not create an event if it already exists', async () => {
      const mockGoogleEvent = [
        { summary: 'Existing Event', start: { dateTime: '2024-10-23T10:00:00Z' }, end: { dateTime: '2024-10-23T11:00:00Z' } },
      ];

      gapi.client.calendar.events.list.mockResolvedValueOnce({ result: { items: mockGoogleEvent } });

      await syncCalendarEvents();
      expect(mockAxios.post).not.toHaveBeenCalled();
    });

    it('should log error if syncing calendar events fails', async () => {
      const mockError = new Error('Failed to sync events');
      gapi.auth2.getAuthInstance().signIn.mockRejectedValueOnce(mockError);
      console.error = jest.fn();

      await expect(syncCalendarEvents()).rejects.toThrow('Failed to sync events');
      expect(console.error).toHaveBeenCalledWith('Error syncing calendar events:', mockError);
    });
  });

  describe('checkEventExists', () => {
    it('should return true if the event exists', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: { exists: true } });

      const result = await checkEventExists('Test Event', '2024-10-23T10:00:00Z');
      expect(mockAxios.get).toHaveBeenCalledWith(`${global.route}/events/check`, {
        params: { eventname: 'Test Event', startDate: '2024-10-23T10:00:00Z' },
        withCredentials: true,
      });
      expect(result).toBe(true);
    });

    it('should return false if the event does not exist', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: { exists: false } });

      const result = await checkEventExists('Nonexistent Event', '2024-10-23T10:00:00Z');
      expect(result).toBe(false);
    });

    it('should log an error and return false if checkEventExists request fails', async () => {
      const mockError = new Error('Request failed');
      mockAxios.get.mockRejectedValueOnce(mockError);
      console.error = jest.fn();

      const result = await checkEventExists('Test Event', '2024-10-23T10:00:00Z');
      expect(console.error).toHaveBeenCalledWith('Error checking if event exists:', mockError);
      expect(result).toBe(false);
    });
  });

  describe('createEvent', () => {
    it('should create a new event successfully', async () => {
      const newEvent = { eventname: 'New Event', startDate: '2024-10-23T10:00:00Z', endDate: '2024-10-23T11:00:00Z' };
      mockAxios.post.mockResolvedValueOnce({ data: { event: 'createdEvent' } });

      const result = await createEvent(newEvent);
      expect(mockAxios.post).toHaveBeenCalledWith(`${global.route}/events/create`, newEvent, { withCredentials: true });
      expect(result).toBe('createdEvent');
    });

    it('should log error if createEvent fails', async () => {
      const mockError = new Error('Create event failed');
      mockAxios.post.mockRejectedValueOnce(mockError);
      console.error = jest.fn();

      await createEvent({ eventname: 'Test Event' });
      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });
});
