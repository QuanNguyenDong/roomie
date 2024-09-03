# This algorithm assigns each user with a set of tasks, making sure that each user has roughly the same amount of work
# This algorithm uses a greedy First-Fit Decreasing algorithm
# This algorithm works by assigning tasks in decreasing work order where the tasks are assigned to the user with current least amount of assigned work
# This doesn't necessarily result in the best allocation however true solutions are much more computationally expensive and this should suit our needs

# Inputs:
#   - List of tasks (taskId, duration)
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
        # Sort all TaskAllocation objects ascending by how much work they have been assigned
        # Assign the current task to the user with the least amount of allocated work
        task_allocations.sort(key=task_allocation_sort)        
        task_allocations[0].allocated_tasks.append(task["taskId"])
        task_allocations[0].allocated_work += task["duration"]                                                 

    return task_allocations

# This algorithm operates the same as the basic allocate_tasks except that it also takes a user preference for a task into account
#
# Inputs:
#   - List of tasks (taskId, duration)
#   - List of users (userId, preferredTaskId)
# Outputs:
#   - List of tasks for each users
def allocate_tasks_with_preferred(tasks, users):
    task_allocations = []
    # Create new TaskAllocation object for each user
    for user in users:
        allocation = {"userId":user["userId"], "allocatedTasks":[], "totalDuration":0}
        task_allocations.append(allocation)    

    # Sort tasks in descending order based on work_amount
    tasks.sort(reverse=True, key=task_sort)

    # Allocate preferred tasks first
    for user in users:
        preferred_task_id = user.get("preference")
        if preferred_task_id:
            for task in tasks:
                if task["taskId"] == preferred_task_id:
                    # Find the user's allocation and assign the preferred task
                    for allocation in task_allocations:
                        if allocation["userId"] == user["userId"]:
                            allocation["allocatedTasks"].append(task["taskId"])
                            allocation["totalDuration"] += task["duration"]
                            tasks.remove(task)  # Remove the task from the available list
                            break
                    break

    for task in tasks:
        # Sort all TaskAllocation objects ascending by how much work they have been assigned
        # Assign the current task to the user with the least amount of allocated work
        task_allocations.sort(key=task_allocation_sort)
        task_allocations[0]["allocatedTasks"].append(task["taskId"])
        task_allocations[0]["totalDuration"] += task["duration"] 
    
    return task_allocations


def task_sort(task):
    return task["duration"]

def task_allocation_sort(task_allocation):
    return task_allocation["totalDuration"]



