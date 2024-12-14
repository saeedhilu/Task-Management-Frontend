import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from '../Navbar/Navbar';

const UserLayout = () => {
  return (
    <div >
      <Navbar />
      <div >
        <Outlet /> 
      </div>
    </div>
  );
};

export default UserLayout;
