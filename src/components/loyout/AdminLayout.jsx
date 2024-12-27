import React from 'react';
import { Outlet } from 'react-router-dom'; 
import { SidebarComponent } from '../sidebar/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar fixed position */}
      <div className=" fixed top-0 left-0 h-full w-64  shadow-lg">
        <SidebarComponent />
      </div>

      {/* Main content area */}
      <div className="pl-72 p-6 overflow-auto">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
