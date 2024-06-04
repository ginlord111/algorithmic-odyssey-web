import { useSession } from "next-auth/react"

export const isLogin = () => {
    const { data: session } = useSession()
    if(session && session.user.id){
        return true
    }
    return false

}