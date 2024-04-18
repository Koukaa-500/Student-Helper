import React, { useEffect } from 'react';
import { getAuthToken, removeAuthToken } from './authService';

function Logout({ children }) {
    useEffect(() => {
        // Check token validity on component mount
        const token = getAuthToken();
        
        if (!token) {
            // Token is invalid or expired, redirect to login
            window.location.href = '/login';
        }

        // Attach the token to the Authorization header in HTTP requests
        // Make authenticated API calls
    }, []);

    const handleLogout = () => {
        // Remove token and redirect to login
        removeAuthToken();
        window.location.href = '/login';
    };

    return (
        <div>
            {/* Protected component content */}
            {children}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
