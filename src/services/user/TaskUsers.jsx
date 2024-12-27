import instance from "@/utils/AxiosInstance"

const TaskUsers=async(taskId)=>{
    const response  = await instance.get(`users/task-useres/${taskId}`)
    return response.data
}
export default TaskUsers;   