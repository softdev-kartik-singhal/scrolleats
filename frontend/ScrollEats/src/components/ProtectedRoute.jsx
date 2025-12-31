import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/food`, {
                    withCredentials: true
                });

                if (response.data.foodItems) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                // User is not authenticated
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#000',
                color: '#fff',
                fontSize: '1.2rem'
            }}>
                <p>Loading...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/user/login" replace />;
    }

    // Render the protected component if authenticated
    return children;
};

export default ProtectedRoute;
