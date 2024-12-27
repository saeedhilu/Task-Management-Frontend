import instance from "@/utils/AxiosInstance";

const ProjectService = {
  // Fetch all projects
  fetchProjects: async () => {
    const response = await instance.get("/projects/project/");
    console.log('====================================');
    console.log('Response is :', response);
    console.log('====================================');
    return response.data;
  },

  // Fetch a single project by ID
  fetchProjectById: async (projectId) => {
    const response = await instance.get(`/projects/project/${projectId}/`);
    return response.data;
  },

  // Create a new project
  createProject: async (projectData) => {
    const response = await instance.post("/projects/project/", projectData);
    return response.data;
  },

  // Update an existing project
  updateProject: async (projectId, projectData) => {
    console.log('project id and project data is :', projectData, projectId );
    
    const response = await instance.patch(`/projects/project/${projectId}/`, projectData);
    return response.data;
  },

  // Delete a project
  deleteProject: async (projectId) => {
    const response = await instance.delete(`/projects/project/${projectId}/`);
    return response.data;
  },
};

export default ProjectService;
