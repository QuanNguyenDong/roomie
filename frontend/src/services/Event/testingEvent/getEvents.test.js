import axios from 'axios';
import { getEvents, getHomeEvents } from '../getEvents';

jest.mock('axios');

describe('getEvents Service', () => {

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid interference
  });

  it('should fetch all events with getEvents', async () => {
    // Arrange: Mock successful response from axios
    const mockEvents = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
    axios.get.mockResolvedValueOnce({ data: mockEvents });

    // Act: Call the getEvents function
    const result = await getEvents();

    // Assert: Verify that axios was called with the correct URL and options
    expect(axios.get).toHaveBeenCalledWith(global.route + '/events/all', { withCredentials: true });
    
    // Assert: Check if the result is as expected
    expect(result).toEqual(mockEvents);
  });

  it('should log error if getEvents request fails', async () => {
    // Arrange: Mock a failed response from axios
    const mockError = new Error('Failed to fetch');
    axios.get.mockRejectedValueOnce(mockError);
    console.error = jest.fn(); // Mock console.error to test error logging

    // Act: Call the getEvents function (it should catch the error)
    await getEvents();

    // Assert: Verify that the error is logged
    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});

describe('getHomeEvents Service', () => {

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should fetch active home events with getHomeEvents', async () => {
    // Arrange: Mock successful response from axios
    const mockHomeEvents = [{ id: 1, name: 'Active Event 1' }];
    axios.get.mockResolvedValueOnce({ data: mockHomeEvents });

    // Act: Call the getHomeEvents function
    const result = await getHomeEvents();

    // Assert: Verify axios was called with the correct URL and options
    expect(axios.get).toHaveBeenCalledWith(global.route + '/events/all/active', { withCredentials: true });
    
    // Assert: Check if the result is as expected
    expect(result).toEqual(mockHomeEvents);
  });

  it('should return an empty array if getHomeEvents response is not an array', async () => {
    // Arrange: Mock axios response with non-array data
    axios.get.mockResolvedValueOnce({ data: {} });

    // Act: Call the getHomeEvents function
    const result = await getHomeEvents();

    // Assert: Verify that an empty array is returned
    expect(result).toEqual([]);
  });

  it('should log error and return empty array if getHomeEvents request fails', async () => {
    // Arrange: Mock a failed response from axios
    const mockError = new Error('Failed to fetch active events');
    axios.get.mockRejectedValueOnce(mockError);
    console.error = jest.fn(); // Mock console.error to test error logging

    // Act: Call the getHomeEvents function
    const result = await getHomeEvents();

    // Assert: Verify that the error is logged and an empty array is returned
    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(result).toEqual([]);
  });
});
