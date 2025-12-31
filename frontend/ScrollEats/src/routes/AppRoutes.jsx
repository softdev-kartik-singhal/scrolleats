import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/Food-PartnerRegister';
import FoodPartnerLogin from '../pages/auth/Food-PartnerLogin';
import LandingPage from '../pages/general/LandingPage';
import Reels from '../pages/general/Reels';
import SavedReels from '../pages/general/SavedReels';
import CreateFood from "../pages/food-partner/CreateFood"
import Profile from '../pages/food-partner/Profile';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path='/' element={<LandingPage />}></Route>
                    <Route path='/user/register' element={<UserRegister />}></Route>
                    <Route path='/user/login' element={<UserLogin />}></Route>
                    <Route path='/food-partner/register' element={<FoodPartnerRegister />}></Route>
                    <Route path='/food-partner/login' element={<FoodPartnerLogin />}></Route>

                    {/* Protected Routes */}
                    <Route path='/reels' element={<ProtectedRoute><Reels /></ProtectedRoute>}></Route>
                    <Route path='/saved' element={<ProtectedRoute><SavedReels /></ProtectedRoute>}></Route>
                    <Route path='/create-food' element={<ProtectedRoute><CreateFood /></ProtectedRoute>}></Route>
                    <Route path='/food-partner/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default AppRoutes;