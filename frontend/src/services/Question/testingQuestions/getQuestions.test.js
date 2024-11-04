import axios from 'axios';
import getQuestions from '../getQuestions';

jest.mock('axios');

describe('getQuestions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch questions successfully', async () => {
    const mockQuestions = [
      { id: 1, question: 'What is your favorite color?' },
      { id: 2, question: 'What is your hobby?' }
    ];
    
    axios.get.mockResolvedValueOnce({ data: mockQuestions });

    const result = await getQuestions();
    expect(axios.get).toHaveBeenCalledWith(global.route + '/questions');
    expect(result).toEqual(mockQuestions);
  });

  test('should log an error if the request fails', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValueOnce(error);

    console.error = jest.fn();

    const result = await getQuestions();
    expect(axios.get).toHaveBeenCalledWith(global.route + '/questions');
    expect(console.error).toHaveBeenCalledWith(error);
    expect(result).toBeUndefined();
  });
});
