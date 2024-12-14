import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import Spinner from "../spinner/Spinner";
import UserLayout from "../loyout/UserLayout";

const LoginPage = lazy(() => import('../../pages/user/Login'));
const Home = lazy(() => import('../../pages/user/Home'));
const Signup = lazy(() => import('../../pages/user/Signup'));

const UserRoutes = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="user" element={<UserLayout />}>
                    <Route path="home" element={<Home />} />  {/* relative path */}
                    <Route path="signup" element={<Signup />} />  {/* relative path */}
                    <Route path="login" element={<LoginPage />} />  {/* relative path */}
                </Route>
            </Routes>
        </Suspense>
    );
};

export default UserRoutes;
