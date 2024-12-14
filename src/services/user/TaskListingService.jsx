import instance from "@/utils/AxiosInstance";

const FetchTask = async (userEmail, selectedStatus = "todo") => {
    const response = await instance.get("tasks/taks-specific/", {
        params: {
            user_email: userEmail,  
            status: selectedStatus   
        }
    });
    return response.data;
};

export default FetchTask;
