import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PublicForm from './PublicForm.jsx'
import PrivateForm from './PrivateForm.jsx'


export default function Onboard(){

    const navigate = useNavigate();

    const { user, onboardStatus, loading, refreshAuth } = useAuth();
    useEffect(() => {
        if (!loading && !user){
            navigate('/login', { replace: true })
        };
        if (!loading && user && onboardStatus === "completed"){
            navigate('/myprofile', { replace: true })
        }
    }, [user, loading, onboardStatus])

    

    return(
        <>
            {onboardStatus === "need_public" && <PublicForm />}
            {onboardStatus === "need_private" && <PrivateForm />}
        </>
        
    )
}