from datetime import date, timedelta

# This algorithm assigns each user with a set of tasks, making sure that each user has roughly the same amount of work
# This algorithm uses a greedy First-Fit Decreasing algorithm
# This algorithm works by assigning tasks in decreasing work order where the tasks are assigned to the user with current least amount of assigned work
# This doesn't necessarily result in the best allocation however true solutions are much more computationally expensive and this should suit our needs

# Inputs:
#   - List of tasks (taskId, duration, frequency)
#   - List of users (userId)
# Outputs:
#   - List of tasks for each users
def allocate_tasks(tasks, users):
    task_allocations = []
    # Create new TaskAllocation object for each user
    for user in users:
        allocation = {"userId":user["userId"], "allocatedTasks":[], "totalDuration":0}
        task_allocations.append(allocation)    

    # Sort tasks in descending order based on work_amount
    tasks.sort(reverse=True, key=task_sort)
    
    for task in tasks:
        # If this task doesn't need to be assigned this cycle skip it
        if (get_last_assigned_date(task) + timedelta(days=task['frequency']) > date.today() + timedelta(days=7)):
            print("Task " + str(task["taskId"]) + " doesn't need to be assigned this cycle")
            continue
        
        # TODO
        # If tasks have to be allocated multiple times within a week we can't just allocate once to a user and continue        
        for i in range(1, 8, task['frequency']):
            # Sort all TaskAllocation objects ascending by how much work they have been assigned
            # Assign the current task to the user with the least amount of allocated work
            task_allocations.sort(key=task_allocation_sort)        
            task_allocations[0]["allocatedTasks"].append({"taskId": task["taskId"], "assignedDate": date.today(), "startDate": date.today() + timedelta(days=i)})
            task_allocations[0]["totalDuration"] += task["duration"]                                               

    return task_allocations

def task_sort(task):
    return task["duration"]

def task_allocation_sort(task_allocation):
    return task_allocation["totalDuration"]

def get_last_assigned_date(task):
    return date.today() - timedelta(days=8)



