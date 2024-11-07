// CreateTask.test.js
import axios from 'axios';
import { createTask, completeTask } from '../CreateTask';

jest.mock('axios');

describe('CreateTask service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('should successfully create a task and return the task data', async () => {
            const newTask = { title: 'Test Task', description: 'This is a test task.' };
            const mockTaskResponse = { data: { task: newTask } };

            axios.post.mockResolvedValueOnce(mockTaskResponse);

            const result = await createTask(newTask);

            expect(axios.post).toHaveBeenCalledWith(`${global.route}/tasks/create`, newTask, { withCredentials: true });
            expect(result).toEqual(newTask);
        });

        it('should log an error when creating a task fails', async () => {
            const newTask = { title: 'Test Task', description: 'This is a test task.' };
            const errorMessage = 'Failed to create task';

            console.error = jest.fn();
            axios.post.mockRejectedValueOnce(new Error(errorMessage));

            const result = await createTask(newTask);

            expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
            expect(result).toBeUndefined();
        });
    });

    describe('completeTask', () => {
        it('should complete a task and return the response data', async () => {
            const assignId = '12345';
            const mockCompleteResponse = { data: { message: 'Task completed successfully' } };

            axios.put.mockResolvedValueOnce(mockCompleteResponse);

            const result = await completeTask(assignId);

            expect(axios.put).toHaveBeenCalledWith(`${global.route}/tasks/${assignId}/complete`, {}, { withCredentials: true });
            expect(result).toEqual(mockCompleteResponse.data);
        });

        it('should log an error when completing a task fails', async () => {
            const assignId = '12345';
            const errorMessage = 'Error completing task';

            console.error = jest.fn();
            axios.put.mockRejectedValueOnce(new Error(errorMessage));

            const result = await completeTask(assignId);

            expect(console.error).toHaveBeenCalledWith('Error completing task:', errorMessage);
            expect(result).toBeUndefined();
        });
    });
});
