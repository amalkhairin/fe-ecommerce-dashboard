import axiosInstance from "./axiosInstance"

class AuthAPI {

    static login = async (username, password) => {
        try {
            const response = await axiosInstance.post('/auth/signin', {
                username,
                password
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default AuthAPI