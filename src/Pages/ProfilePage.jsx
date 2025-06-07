import React from 'react';
import { useSelector } from 'react-redux';

function ProfilePage() {
    const {user} = useSelector(state => state.auth)
    return (
        <div>
            <h3>Profile Page</h3>
            <p>UserName: {user.username}</p>
            <p>Name: {user.firstName} {user.lastName}</p>
        </div>
    );
}

export default ProfilePage;