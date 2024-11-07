import axios from 'axios';
import { createReviews, addStars } from '../createReviews';

jest.mock('axios');

describe('createReviews', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a review successfully', async () => {
    const mockReviewData = { message: 'Review created successfully' };
    const reviews = { rating: 5, comment: 'Great experience!' };

    axios.post.mockResolvedValueOnce({ data: mockReviewData });

    const result = await createReviews(reviews);

    expect(axios.post).toHaveBeenCalledWith(`${global.route}/reviews`, reviews, {
      withCredentials: true,
    });

    expect(result).toEqual(mockReviewData);
  });

  test('should log an error if creating a review fails', async () => {
    const error = new Error('Network Error');
    axios.post.mockRejectedValueOnce(error);

    console.error = jest.fn();
    const result = await createReviews({});

    expect(console.error).toHaveBeenCalledWith(error);
    expect(result).toBeUndefined();
  });
});

describe('addStars', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add stars to a user successfully', async () => {
    const mockStarsData = { message: 'Stars added successfully' };
    const userId = '12345';
    const amount = 5;

    axios.post.mockResolvedValueOnce({ data: mockStarsData });

    const result = await addStars(userId, amount);

    expect(axios.post).toHaveBeenCalledWith(`${global.route}/users/${userId}/stars`, { amount }, {
      withCredentials: true,
    });

    expect(result).toEqual(mockStarsData);
  });

  test('should log an error if adding stars fails', async () => {
    const error = new Error('Network Error');
    axios.post.mockRejectedValueOnce(error);

    console.error = jest.fn();

    const result = await addStars('12345', 5);

    expect(console.error).toHaveBeenCalledWith(error);
    expect(result).toBeUndefined();
  });
});
