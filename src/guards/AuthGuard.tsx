import { useAuth } from "@/providers/AuthProvider";

const AuthGuard = ({children}:{children: React.ReactNode}) => {

    const {signout, token} = useAuth()

    if(!token){
        signout()
    }

    return (<>
        {children}
    </>);
}
 
export default AuthGuard;