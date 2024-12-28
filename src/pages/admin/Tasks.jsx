import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "react-query";
import TasksService from '@/services/admin/Tasks';
import TaskCard from '@/components/card/TasksCard';
import SkeletonCard from '@/components/skeletons/TaskCardSkeleton';
import useToastNotification from '@/hooks/useToastNotification';
import { Button } from '@/components/ui/button';
import DialogComponent from '@/components/diologue/Diologue';

const TaskList = () => {
  const { data: tasks, isLoading, isError, error, refetch } = useQuery('tasks', TasksService.fetchTaskss);
  const showToast = useToastNotification();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "",
  });
  const [selectedProject, setSelectedProject] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleRemoveProject = (taskId) => {
    setSelectedProject((prev) => prev.filter((task) => task.id !== taskId));
  };

  const createMutation = useMutation((data) => TasksService.createTasks(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      refetch();
      showToast("Task added successfully!", "success");
      setSelectedMembers([])
      setSelectedProject([])
      setIsDialogOpen(false);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.title?.[0] || "Failed to add task!";
      showToast(errorMessage, "error");
    },
  });
  const handleRemoveMember = (memberId) => {
    setSelectedMembers((prevSelectedMembers) =>
      prevSelectedMembers.filter((member) => member.id !== memberId)
    );
  };

  const handleAddTask = (data) => {
    console.log('dat for submit is :', data);

    if (
      data.title.trim() &&
      data.due_date &&
      selectedProject.length > 0 &&
      selectedMembers.length > 0 &&
      data.priority

    ) {
      createMutation.mutate({
        ...newTask,
        project: selectedProject[0].id,
        assigned_to: selectedMembers.map((assign) => assign.id)
      });
    } else {
      showToast("Please fill in all fields and add at least one task.", "error");
    }
  };

  const handleTaskDeleted = async (taskId) => {
    try {
      await TasksService.deleteTasks(taskId);
      queryClient.invalidateQueries('tasks');
      showToast("Task deleted successfully!", "success");
    } catch (err) {
      showToast("Failed to delete task.", "error");
    }
  };

  if (isLoading) return <SkeletonCard />;
  if (isError) return <div>Error loading tasks: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => setIsDialogOpen(true)}>Add New Task +</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.length === 0 ? (
          <div>No tasks found</div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleTaskDeleted} />
          ))
        )}
        <DialogComponent
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Add New Task"
          description="Fill in the details of the new task."
          inputs={[
            {
              label: "Task Title",
              id: "title",
              name: "title",
              value: newTask.title,
              onChange: handleInputChange,
            },
            {
              label: "Description",
              id: "description",
              name: "description",
              value: newTask.description,
              onChange: handleInputChange,
            },
            {
              label: "Due Date",
              id: "due_date",
              name: "due_date",
              value: newTask.due_date,
              onChange: handleInputChange,
            },
            {
              label: "Priority",
              id: "priority",
              name: "priority",
              value: newTask.priority,
              onChange: handleInputChange,
            },
          ]}
          onSubmit={handleAddTask}
          submitButtonText="Add Task"
          cancelButtonText="Cancel"
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          handleRemoveProject={handleRemoveProject}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
          handleRemoveMember={handleRemoveMember}
        />
      </div>
    </div>
  );
};

export default TaskList;
