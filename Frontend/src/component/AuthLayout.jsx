import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = Cookies.get('userData') !== (null || undefined) ? true : false

    useEffect(() => {
        //TODO: make it more easy to understand

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

// The purpose of this file when user in anyWhere in the website and do someThing 
// then this file will help us to locate that user is login or not or any third party are excess our site or not... 
// if do, then user will reach on login page other wise he is reach on home or root page....