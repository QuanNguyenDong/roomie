// getReviews.test.js
import axios from 'axios';
import getReviews from '../getReviews';

jest.mock('axios');

describe('getReviews', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch reviews successfully', async () => {
    const mockReviewData = { reviewData: [{ id: 1, comment: 'Great service!' }] };

    axios.get.mockResolvedValueOnce({ data: mockReviewData });
    const result = await getReviews();

    expect(axios.get).toHaveBeenCalledWith(`${global.route}/reviews`, {
      withCredentials: true,
    });

    expect(result).toEqual(mockReviewData.reviewData);
  });

  test('should log an error if fetching reviews fails', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValueOnce(error);

    console.error = jest.fn();
    const result = await getReviews();

    expect(console.error).toHaveBeenCalledWith(error);
    expect(result).toBeUndefined();
  });
});
