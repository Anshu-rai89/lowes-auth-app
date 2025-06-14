import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function ProtectedRoutes({children}) {
    const {user} = useSelector(state=> state.auth);

     if(user?.username) {
         return children;
     }

     return <Navigate to={"/login"}/>
}

export default ProtectedRoutes;