import axios from 'axios';
import { getTasks, getTasksForUser } from '../getTasks 4';

jest.mock('axios'); // Mock axios

describe('getTasks', () => {
  it('should return all tasks when API call is successful', async () => {
    // Mock response for axios GET request
    const mockTasks = [{ id: 1, task: 'Task 1' }, { id: 2, task: 'Task 2' }];
    axios.get.mockResolvedValue({ data: { tasks: mockTasks } });

    // Call the getTasks function
    const tasks = await getTasks();

    // Assertions
    expect(tasks).toEqual(mockTasks);
    expect(axios.get).toHaveBeenCalledWith(global.route + '/tasks/all', { withCredentials: true });
  });

  it('should handle error when API call fails', async () => {
    // Mock API call failure
    axios.get.mockRejectedValue(new Error('API call failed'));

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Call getTasks function and handle error
    await getTasks();

    // Assertions
    expect(consoleSpy).toHaveBeenCalledWith(new Error('API call failed'));
    consoleSpy.mockRestore();
  });
});

describe('getTasksForUser', () => {
  it('should return assigned tasks when API call is successful', async () => {
    // Mock response for axios GET request
    const mockUserTasks = [{ id: 1, task: 'User Task 1' }, { id: 2, task: 'User Task 2' }];
    axios.get.mockResolvedValue({ data: { tasks: mockUserTasks } });

    // Call the getTasksForUser function
    const tasks = await getTasksForUser();

    // Assertions
    expect(tasks).toEqual(mockUserTasks);
    expect(axios.get).toHaveBeenCalledWith(global.route + '/tasks/assigned', { withCredentials: true });
  });

  it('should handle error when API call fails', async () => {
    // Mock API call failure
    axios.get.mockRejectedValue(new Error('API call failed'));

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Call getTasksForUser function and handle error
    await getTasksForUser();

    // Assertions
    expect(consoleSpy).toHaveBeenCalledWith(new Error('API call failed'));
    consoleSpy.mockRestore();
  });
});
