import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const MainLayout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <main>
        <Outlet /> {/* This renders the nested routes */}
      </main>
    </div>
  );
};

export default MainLayout;
