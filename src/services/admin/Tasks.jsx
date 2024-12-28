import instance from "@/utils/AxiosInstance";

const TasksService = {
  fetchTaskss: async () => {
    const response = await instance.get("/tasks/tasks/");
    console.log('====================================');
    console.log('Response is :', response);
    console.log('====================================');
    return response.data;
  },

  // Fetch a single Tasks by ID
  fetchTasksById: async (TasksId) => {
    const response = await instance.get(`/tasks/tasks/${TasksId}/`);
    return response.data;
  },

  // Create a new Tasks
  createTasks: async (tasksData) => {
    const payload = {
      title: tasksData.title,
      description: tasksData.description,
      due_date: tasksData.due_date,
      priority: tasksData.priority,
      assigned_to: tasksData.assigned_to, // Mapping members to assigned_to
      created_by: 1, // Replace with actual user ID (or fetch dynamically if needed)
      project: tasksData.project, // Replace with the project ID relevant to the task
    };

    console.log('create task is :', tasksData);

    const response = await instance.post("/tasks/tasks/", payload);
    return response.data;
  },

  // Update an existing Tasks
  updateTasks: async (TasksId, TasksData) => {
    console.log('task id and task data is :', TasksId, TasksData);

    const response = await instance.patch(`/tasks/tasks/${TasksId}/`, TasksData);
    return response.data;
  },

  // Delete a Tasks
  deleteTasks: async (TasksId) => {
    const response = await instance.delete(`/tasks/tasks/${TasksId}/`);
    return response.data;
  },
};

export default TasksService;
