import React from 'react';
import { FaTachometerAlt, FaShoppingBag, FaInbox, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { ModeToggle } from '../ThemeProvider/mode-toggle';

export function SidebarComponent() {
  const items = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { path: '/admin/project', label: 'Projects', icon: FaShoppingBag },
    { path: '/admin/tasks', label: 'Tasks', icon: FaInbox },
    { path: '/admin/tag', label: 'Tags', icon: FaUserCircle },
    { path: '/admin/settings', label: 'Settings', icon: FaCog },
  ];

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-[calc(100vh)] w-full max-w-[20rem]   p-6 shadow-lg rounded-lg border ">
      <div className="mb-6 flex justify-between" >
        <h5 className="text-2xl font-bold ">Sidebar</h5>
        <ModeToggle/>
      </div>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
              isActive(item.path) ? 'bg-blue-300 ' : 'hover:bg-gray-400'
            }`}
          >
            <Link to={item.path} className="flex items-center w-full">
              <item.icon className="h-6 w-6 " />
              <span className="ml-3 text-base font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
        
      </ul>
    </div>
  );
}
