import instance from "@/utils/AxiosInstance";

const CommentService = {
  // Fetch all Comments
  fetchComments: async () => {
    const response = await instance.get("/users/comment/");
    console.log('====================================');
    console.log('Response is :', response);
    console.log('====================================');
    return response.data;
  },

  // Fetch a single Comment by ID
  fetchCommentById: async (taskId) => {
    const response = await instance.get(`/users/comment/${taskId}/`);
    return response.data;
  },

  // Create a new Comment
  createComment: async (CommentData) => {
    console.log('Command data is :', CommentData);

    const response = await instance.post("/users/comment/", CommentData);
    console.log('====================================');
    console.log('Resoinse when creating the comment is :', response);
    console.log('====================================');
    return response.data;
  },

  // Update an existing Comment
  updateComment: async (CommentId, CommentData) => {
    const response = await instance.patch(`/users/comment/${CommentId}/`, CommentData);
    return response.data;
  },

  // Delete a Comment
  deleteComment: async (CommentId) => {
    const response = await instance.delete(`/users/comment/${CommentId}/`);
    return response.data;
  },
};

export default CommentService;
