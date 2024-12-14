// import React, { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import {  Textarea } from '@/components/ui/textarea';
// import {   Select } from '@/components/ui/select';
// import {  Button } from '@/components/ui/button'
// import TasksService from '@/services/admin/Tasks';

// const CreateTaskForm = ({ onTaskCreated }) => {
//   const [taskData, setTaskData] = useState({
//     title: '',
//     description: '',
//     priority: 'medium',
//     due_date: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTaskData({ ...taskData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await TasksService.createTasks(taskData);
//       onTaskCreated(); // Notify parent to refetch tasks
//       setTaskData({ title: '', description: '', priority: 'medium', due_date: '' });
//     } catch (error) {
//       console.error('Error creating task:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input
//         name="title"
//         value={taskData.title}
//         onChange={handleInputChange}
//         placeholder="Task title"
//         label="Title"
//         required
//       />
//       <Textarea
//         name="description"
//         value={taskData.description}
//         onChange={handleInputChange}
//         placeholder="Task description"
//         label="Description"
//       />
//       <Select
//         name="priority"
//         value={taskData.priority}
//         onChange={handleInputChange}
//         label="Priority"
//       >
//         <Select.Item value="low">Low</Select.Item>
//         <Select.Item value="medium">Medium</Select.Item>
//         <Select.Item value="high">High</Select.Item>
//         <Select.Item value="urgent">Urgent</Select.Item>
//       </Select>
//       <Input
//         type="date"
//         name="due_date"
//         value={taskData.due_date}
//         onChange={handleInputChange}
//         label="Due Date"
//       />
//       <Button type="submit" className="btn-primary">
//         Create Task
//       </Button>
//     </form>
//   );
// };

// export default CreateTaskForm;
