import instance from "@/utils/AxiosInstance";

const fetchNotifications = async () => {
    const respoonse = await instance.get('users/notifications')
    return respoonse.data
}
export default fetchNotifications;