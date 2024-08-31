# This algorithm assigns each user with a set of tasks, making sure that each user has roughly the same amount of work
# This algorithm uses a greedy First-Fit Decreasing algorithm
# This algorithm works by assigning tasks in decreasing work order where the tasks are assigned to the user with current least amount of assigned work
# This doesn't necessarily result in the best allocation however true solutions are much more computationally expensive and this should suit our needs

# Inputs:
#   - List of tasks (task_id, task_length)
#   - List of users (user_id)
# Outputs:
#   - List of tasks for each users
def allocate_tasks(tasks, users):
    total_work = 0
    for task in tasks:
        total_work += task["work_amount"]    

    task_allocations = []
    for user in users:
        allocation = TaskAllocation(user["user_id"])
        task_allocations.append(allocation)    

    tasks.sort(reverse=True, key=task_sort)
    for task in tasks:
        task_allocations.sort(key=task_allocation_sort)        
        task_allocations[0].allocated_tasks.append(task["task_id"])
        task_allocations[0].allocated_work += task["work_amount"]                                                 

    return task_allocations


def task_sort(task):
    return task["work_amount"]

def task_allocation_sort(task_allocation):
    return task_allocation.allocated_work

class TaskAllocation:
    def __init__(self, user_id):
        self.user_id = user_id
        self.allocated_tasks = []
        self.allocated_work = 0



