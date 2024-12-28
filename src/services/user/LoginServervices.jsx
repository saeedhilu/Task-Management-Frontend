import instance from "@/utils/AxiosInstance";

const LoginService = async (loginData) => {

    const response = await instance.post("users/login/", loginData);
    return response.data;
};

export default LoginService;
