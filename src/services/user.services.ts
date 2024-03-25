import baseURL from "@/environments/baseURL";
import { userRegister } from "@/types/user.types";

export const registerUser = async (data: userRegister) => {
    try {
        const res = await baseURL.post('/users', {

            name: data.name,
            email: data.email,
            password: data.password,
            picture: data.picture,

        })

        if(res.status != 201){
            return res.status
        }
        
        return res.data
    }
    catch(err: any) {
        return err.request.status
    }

}
