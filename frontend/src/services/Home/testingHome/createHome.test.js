import axios from 'axios';
import createHome from '../createHome';

// Mock axios
jest.mock('axios');

describe('createHome Service', () => {
  const mockBody = { name: 'Test Home', location: 'Test Location' };

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should successfully create a home and return the response', async () => {
    const mockResponse = { data: { success: true, home: mockBody } };

    // Mock the axios.post method to return a successful response
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await createHome(mockBody);

    expect(axios.post).toHaveBeenCalledWith(global.route + '/home/create', mockBody, {
      withCredentials: true,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should handle errors and return the error response', async () => {
    const mockErrorResponse = {
      response: { data: { success: false, message: 'Error occurred' } },
    };

    // Mock axios.post to throw an error
    axios.post.mockRejectedValueOnce(mockErrorResponse);

    const result = await createHome(mockBody);

    expect(axios.post).toHaveBeenCalledWith(global.route + '/home/create', mockBody, {
      withCredentials: true,
    });

    expect(result).toEqual(mockErrorResponse.response.data);
  });
});
