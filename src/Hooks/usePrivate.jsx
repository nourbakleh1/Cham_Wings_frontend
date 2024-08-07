import React from 'react'
import { useSelector } from 'react-redux'

const usePrivate = () => {
    const {user}=useSelector((state)=>state.auth)

    
        const getToken=()=>{
            return user?.token
        }
}

export default usePrivate