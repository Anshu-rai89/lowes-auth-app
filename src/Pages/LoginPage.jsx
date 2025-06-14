import React, { useEffect, useState } from 'react';
import { login } from '../app/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function LoginPage() {
    const {user} = useSelector(state => state.auth);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = () => {

        dispatch(login({userName, password}));

    }

    useEffect(()=> {
        if (user?.username) navigate("/");
    }, [user?.username]);

console.log("User", user);
    return (
        <div>
            <h3>Login Page</h3>
            <div className='input-fields'>
                <label htmlFor='username-inp'>UserName</label>
                <input id="username-inp" value={userName} name='userName' type='text' onChange={(e) => {
                    setUserName(e.target.value);
                }}/>
            </div>
            <div className='input-fields'>
                <label htmlFor='password-inp'>password</label>
                <input id="password-inp" value={password} name='password' type='text' 
                onChange={
                    (e)=> {
                        setPassword(e.target.value)
                    }
                }
                />
            </div>

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;