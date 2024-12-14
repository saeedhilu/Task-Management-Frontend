import instance from "@/utils/AxiosInstance";

const SignupServices = async (regirsterData) => {
    const response = await instance.post("users/register/", regirsterData);
    return response.data;
};

export default SignupServices;
