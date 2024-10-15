import axios from 'axios';
import { getActiveTaskAssignment, getAllActiveTaskAssignment } from '../getActiveTaskAssignment';

jest.mock('axios'); // Mock axios

describe('getActiveTaskAssignment', () => {
  it('should return the active task assignment for a given taskId when API call is successful', async () => {
    const mockActiveAssignment = { id: 1, assignedTo: 'User A', taskId: 1 };

    // Mock the axios response
    axios.get.mockResolvedValue({ data: { activeAssignment: mockActiveAssignment } });

    // Call the getActiveTaskAssignment function
    const result = await getActiveTaskAssignment(1);

    // Expectations
    expect(result).toEqual(mockActiveAssignment);
    const expectedUrl = `${global.route}/tasks/activeAssignment?task=1`;
    expect(axios.get).toHaveBeenCalledWith(expectedUrl, { withCredentials: true });
  });

  it('should handle error when API call fails', async () => {
    // Mock the axios call to fail
    axios.get.mockRejectedValue(new Error('API call failed'));

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Call the function and expect it to handle the error
    await getActiveTaskAssignment(1);

    // Verify the error is logged
    expect(consoleSpy).toHaveBeenCalledWith(new Error('API call failed'));
    consoleSpy.mockRestore(); // Restore console.error
  });
});

describe('getAllActiveTaskAssignment', () => {
  it('should return all active task assignments when API call is successful', async () => {
    const mockAllActiveAssignments = [
      { id: 1, assignedTo: 'User A', taskId: 1 },
      { id: 2, assignedTo: 'User B', taskId: 2 },
    ];

    // Mock the axios response
    axios.get.mockResolvedValue({ data: { activeAssignment: mockAllActiveAssignments } });

    // Call the getAllActiveTaskAssignment function
    const result = await getAllActiveTaskAssignment();

    // Expectations
    expect(result).toEqual(mockAllActiveAssignments);
    const expectedUrl = `${global.route}/tasks/all/active`;
    expect(axios.get).toHaveBeenCalledWith(expectedUrl, { withCredentials: true });
  });

  it('should handle error when API call fails', async () => {
    // Mock the axios call to fail
    axios.get.mockRejectedValue(new Error('API call failed'));

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Call the function and expect it to handle the error
    await getAllActiveTaskAssignment();

    // Verify the error is logged
    expect(consoleSpy).toHaveBeenCalledWith(new Error('API call failed'));
    consoleSpy.mockRestore(); // Restore console.error
  });
});
