import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/Food-PartnerRegister';
import FoodPartnerLogin from '../pages/auth/Food-PartnerLogin';
import Home from '../pages/general/Home';
import SavedReels from '../pages/general/SavedReels';
import CreateFood from "../pages/food-partner/CreateFood"
import Profile from '../pages/food-partner/Profile';

const AppRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/user/register' element={<UserRegister />}></Route>
                    <Route path='/user/login' element={<UserLogin />}></Route>
                    <Route path='/food-partner/register' element={<FoodPartnerRegister />}></Route>
                    <Route path='/food-partner/login' element={<FoodPartnerLogin />}></Route>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/saved' element={<SavedReels />}></Route>
                    <Route path='/create-food' element={<CreateFood />}></Route>
                    <Route path='/food-partner/:id' element={<Profile />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default AppRoutes;