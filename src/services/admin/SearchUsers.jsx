import instance from "@/utils/AxiosInstance";

const UserSearchService = {
  searchUsers: async (searchTerm) => {
    const response = await instance.get(`/users/users-search?q=${searchTerm}`);
    console.log('====================================');
    console.log('respoose from serahc i s:',response.data);
    console.log('====================================');
    return response.data;
  },
};

export default UserSearchService;
