import { useEffect, useState } from "react"
import axios from "axios"



function UserApi() {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsadmin] = useState(false)
    const [owner, setOwner] = useState('')

    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')))

    useEffect(() => {

        if(token) {
         
            const getUser = async() => {
                const res = await axios.get(`/admin/user`, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setIsLogged(true)

                res.data.admin === 1 ? setIsadmin(true) : setIsadmin(false)
                setOwner(res.data._id)

            


            }

            getUser()

        }


    }, [token, owner])


    return{
        isLogged: [isLogged, setIsLogged],
        owner: [owner, setOwner],
        isAdmin: [isAdmin, setIsadmin]
        
    }


    
}


export default UserApi