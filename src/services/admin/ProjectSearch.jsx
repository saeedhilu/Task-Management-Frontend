import instance from "@/utils/AxiosInstance";

const ProjectSearchService = {
  searchProjects: async (searchTerm) => {
    const response = await instance.get(`/projects/users-search/?q=${searchTerm}`);
    return response.data;
  },
};

export default ProjectSearchService;
