// Import necessary libraries and modules
import axios from 'axios';
import { getUserTask, getTasks } from '../getTasks';

jest.mock('axios');

describe('getUserTask', () => {
  it('should return assigned tasks when API call is successful', async () => {
    // Mocking the response for the axios GET request
    const mockAssignedTasks = [{ id: 1, task: 'Test Task 1' }, { id: 2, task: 'Test Task 2' }];
    axios.get.mockResolvedValue({ data: { assignedTasks: mockAssignedTasks } });

    // Call the getUserTask function
    const tasks = await getUserTask();

    // Expectations
    expect(tasks).toEqual(mockAssignedTasks);
    expect(axios.get).toHaveBeenCalledWith(global.route + `/tasks/assigned`, {
      withCredentials: true,
    });
  });

  it('should handle error when API call fails', async () => {
    // Mocking the error case
    axios.get.mockRejectedValue(new Error('API call failed'));

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Call the getUserTask function
    await getUserTask();

    // Expectations
    expect(consoleSpy).toHaveBeenCalledWith(new Error('API call failed'));
    consoleSpy.mockRestore(); // Restore console.error
  });
});
