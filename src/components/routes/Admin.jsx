import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../loyout/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import Task from '@/pages/admin/Tasks';
import Tag from '@/pages/admin/Tag';
import Project from '@/pages/admin/Projects';
import { Settings } from 'lucide-react';
// import Dashboard from '@/pages/admin/Dashboard';
// import Reports from '@/pages/admin/Reports';
// import Settings from '@/pages/admin/Settings';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="admin/" element={<AdminLayout />}>
       
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="tasks" element={<Task />} />
        <Route path="tag" element={<Tag />} />
        <Route path="project" element={<Project />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
