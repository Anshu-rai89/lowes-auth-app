import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router';
import { login, logout } from '../app/features/auth/authSlice';

function HomePage() {
    const navigate = useNavigate();
    const {user} = useSelector(state=> state.auth);
    const dispath = useDispatch();
    return (
        <div>
            <h3>Welcome to Lowes Auth APP Home Page</h3>
            {
                Object.values(user).length > 0 ? <div>
                    <p>{user.username}</p>
                    <NavLink to={"/profile"}>Profile </NavLink>
                    <button onClick={() => {dispath(logout())}}>Logout</button>
                    </div>  :<button 
                    onClick={()=> {
                        navigate("/login")
                    }}
                    >Login
                </button>
        }
        </div>
    );
}

export default HomePage;