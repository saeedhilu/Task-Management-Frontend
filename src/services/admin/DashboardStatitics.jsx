import instance from "@/utils/AxiosInstance";


const DashboardStatitics = async () => {

    const response = await instance.get('users/summary-statics/')
    return response.data

}
export default DashboardStatitics;